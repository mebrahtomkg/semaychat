require('dotenv').config();
const path = require('node:path');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { rspack } = require('@rspack/core');
const { IS_PRODUCTION, PUBLIC_PATH } = require('./constants');

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  context: __dirname,
  cache: true,
  entry: {
    main: './src/index.tsx',
  },
  devtool: IS_PRODUCTION ? false : 'source-map',
  devServer: {
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000',
    },
    open: false,
    static: false,
  },
  watchOptions: {
    aggregateTimeout: 30,
    ignored: [
      path.resolve(__dirname, '.swc'),
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'public'),
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: PUBLIC_PATH,
  },
  stats: {
    preset: 'normal',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        exclude: [/[\\/]node_modules[\\/]/],
        include: path.resolve(__dirname, 'src'),
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/[\\/]node_modules[\\/]/],
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript', tsx: true, jsx: true },
              transform: {
                react: { runtime: 'automatic', refresh: true },
              },
              experimental: {
                cacheRoot: process.env.SWC_CACHE_DIR || undefined,
                plugins: [
                  [
                    '@swc/plugin-styled-components',
                    { ssr: false, fileName: false },
                  ],
                ],
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      publicPath: PUBLIC_PATH,
      inject: false,
      template: 'index.template.js',
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'sw/service-worker.js'),
          to: 'service-worker.js',
        },
      ],
    }),
  ],
};
