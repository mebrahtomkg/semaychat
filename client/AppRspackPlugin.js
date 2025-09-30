const path = require('node:path');
const fs = require('node:fs/promises');
const crypto = require('node:crypto');
const { API_URL, IS_PRODUCTION } = require('./constants');
const htmlPageTemplate = require('./index.template');

/**
 * @import { Compiler } from '@rspack/core'
 */

const SERVICE_WORKER_FILE_PATH = path.resolve(
  __dirname,
  'sw/service-worker.ts',
);

const SERVICE_WORKER_FILE_NAME = path.basename(SERVICE_WORKER_FILE_PATH);

const SERVICE_WORKER_FILE_NAME_WITHOUT_EXT = SERVICE_WORKER_FILE_NAME.substring(
  0,
  SERVICE_WORKER_FILE_NAME.lastIndexOf('.'),
);

const SWC_OPTIONS = {
  filename: SERVICE_WORKER_FILE_NAME,
  jsc: {
    target: 'es2022',
    parser: {
      syntax: 'typescript',
    },
  },
};

const PLUGIN_NAME = 'AppRspackPlugin';

class AppRspackPlugin {
  /** @type boolean */
  isServiceWorkerModified;

  /**@type {{
   *   name: string,
   *   sourceCode: string
   * } | null}*/
  serviceWorkerAsset;

  constructor() {
    this.isServiceWorkerModified = true;
    this.serviceWorkerAsset = null;
  }

  apply(/** @type Compiler */ compiler) {
    const { rspack } = compiler;
    const { RawSource } = rspack.sources;
    const { swc } = rspack.experiments;
    const { Compilation } = rspack;

    compiler.hooks.watchRun.tap(PLUGIN_NAME, (compiler) => {
      if (
        compiler.modifiedFiles?.has(SERVICE_WORKER_FILE_PATH) ||
        compiler.removedFiles?.has(SERVICE_WORKER_FILE_PATH)
      ) {
        this.isServiceWorkerModified = true;
      }
    });

    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      // Add service worker file to watch list.
      compilation.fileDependencies.add(SERVICE_WORKER_FILE_PATH);

      compilation.hooks.processAssets.tapPromise(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        async (_assets) => {
          if (!this.isServiceWorkerModified) return;
          try {
            const compileStartTime = Date.now();

            const originalCode = await fs.readFile(SERVICE_WORKER_FILE_PATH, {
              encoding: 'utf-8',
            });

            const transformOutput = await swc.transform(
              originalCode,
              SWC_OPTIONS,
            );

            const finalCode = `self.API_URL = '${API_URL}';
                               self.IS_PRODUCTION = ${IS_PRODUCTION};
                               ${transformOutput.code}
                              `;

            const hash = this.generateContentHash(finalCode, 16);

            this.serviceWorkerAsset = {
              name: `${SERVICE_WORKER_FILE_NAME_WITHOUT_EXT}.${hash}.js`,
              sourceCode: finalCode,
            };

            console.log(
              `[${PLUGIN_NAME}] Service worker file compiled in ${Date.now() - compileStartTime} ms`,
            );

            this.isServiceWorkerModified = false;
          } catch (err) {
            compilation.errors.push(
              new Error(
                `[${PLUGIN_NAME}] Failed to process service worker: ${err.message}`,
              ),
            );

            this.isServiceWorkerModified = false;
          }
        },
      );

      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (_assets) => {
          if (this.serviceWorkerAsset) {
            compilation.emitAsset(
              this.serviceWorkerAsset.name,
              new RawSource(this.serviceWorkerAsset.sourceCode),
            );
          }
        },
      );

      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          // Get files(name), Also exclude HMR files
          const files = Object.keys(assets).filter(
            (file) => !file.includes('hot-update'),
          );

          const /** @type string[] */ jsFiles = [];

          // Put vendor first.
          const vendor = files.find(
            (file) => file.startsWith('vendor') && file.endsWith('.js'),
          );
          if (vendor) jsFiles.push(vendor);

          // Put the rest non service worker js files
          for (const file of files) {
            if (
              file.endsWith('.js') &&
              !file.startsWith(SERVICE_WORKER_FILE_NAME_WITHOUT_EXT) &&
              !jsFiles.includes(file)
            ) {
              jsFiles.push(file);
            }
          }

          const serviceWorkerFile = files.find(
            (file) =>
              file.startsWith(SERVICE_WORKER_FILE_NAME_WITHOUT_EXT) &&
              file.endsWith('.js'),
          );

          const htmlSource = htmlPageTemplate({ jsFiles, serviceWorkerFile });

          compilation.emitAsset(`index.html`, new RawSource(htmlSource));
        },
      );
    });
  }

  generateContentHash(content, hashLength = 16) {
    const hash = crypto.createHash('sha256');
    hash.update(content, 'utf8');
    const digest = hash.digest('hex');
    return digest.substring(0, hashLength);
  }
}

module.exports = AppRspackPlugin;
