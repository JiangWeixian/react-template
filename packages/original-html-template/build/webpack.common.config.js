const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ThreadLoader = require('thread-loader')

const configs = require('./config')

ThreadLoader.warmup(configs.workerpool, ['ts-loader', 'babel-loader'])

const config = {
  context: configs.path.context,
  entry: ['./src/index.tsx'],
  output: {
    path: configs.path.output,
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': configs.path.project,
      assets: configs.path.assets,
      static: configs.path.static,
    },
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
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: configs.path.static,
          to: 'static',
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: configs.path.tsconfig,
      },
      async: true,
    }),
  ],
}

module.exports = config
