const path = require('node:path');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { rspack } = require('@rspack/core');

module.exports = {
  mode: 'development',
  context: __dirname,
  cache: true,
  entry: {
    main: './src/index.tsx'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000'
    },
    open: false,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/'
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: false
  },
  stats: {
    preset: 'normal'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.svg$/i,
        exclude: [/[\\/]node_modules[\\/]/],
        include: path.resolve(__dirname, 'src'),
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/[\\/]node_modules[\\/]/],
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'swc-loader'
        }
      }
    ]
  },
  plugins: [
    new ReactRefreshPlugin(),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      publicPath: '/'
    })
  ]
};
