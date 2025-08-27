import { getFileExtension, randomFileName } from '@/utils';
import { StorageEngine } from 'multer';
import path from 'node:path';
import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import { Request } from 'express';

export default class LocalDiskStorageEngine implements StorageEngine {
  private readonly storageDir: string;
  private readonly bucket: string;

  constructor(storageDir: string, bucket: string) {
    this.storageDir = storageDir;
    this.bucket = bucket;
  }

  public async _handleFile(
    _req: Request,
    file: Express.Multer.File,
    callback: (error?: unknown, info?: Partial<Express.Multer.File>) => void,
  ) {
    try {
      const fileName = await randomFileName();

      const filePath = path.resolve(
        this.storageDir,
        this.bucket,
        `${fileName}.${getFileExtension(file.originalname)}`,
      );

      const outStream = fsSync.createWriteStream(filePath);

      file.stream.pipe(outStream);
      outStream.on('error', async (err) => {
        // Delete the incomplete file on error.
        try {
          await fs.unlink(filePath);
        } catch (_err) {}
        callback(err);
      });

      outStream.on('finish', () => {
        callback(null, {
          path: filePath,
          size: outStream.bytesWritten,
        });
      });
    } catch (err) {
      callback(err as Error);
    }
  }

  public async _removeFile(
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null) => void,
  ) {
    try {
      await fs.unlink(file.path);
      callback(null);
    } catch (err) {
      callback(err as Error);
    }
  }
}
