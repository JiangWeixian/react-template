const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const srcDir = '../src/'
const configs = require('./configs')

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  entry: {
    popup: path.join(__dirname, srcDir + 'popup.ts'),
    options: path.join(__dirname, srcDir + 'options.ts'),
    background: path.join(__dirname, srcDir + 'background.ts'),
    content: path.join(__dirname, srcDir + 'content.tsx'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          warnings: false,
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: configs.workerpool,
          },
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin({ patterns: [{ from: '.', to: '../', context: 'public' }] }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(__dirname, '../tsconfig.json'),
      },
      async: true,
    }),
  ],
}
