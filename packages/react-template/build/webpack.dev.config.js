const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ThreadLoader = require('thread-loader')
const WebpackBar = require('webpackbar')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const configs = require('./config')
const common = require('./webpack.common.config')
const port = 8080

ThreadLoader.warmup(configs.workerpool, ['ts-loader', 'babel-loader'])

/**
 * @type import('webpack').Configuration
 */
const dev = {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    path: configs.path.output,
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port,
    watchContentBase: true,
    contentBase: configs.path.public,
    hot: true,
    stats: 'errors-only',
    inline: true,
    compress: true,
    clientLogLevel: 'silent',
    noInfo: true,
    public: `http://localhost:${port}`,
    proxy: {
      '/proxy': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
  optimization: {
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
              namedExport: true,
              silent: true,
            },
          },
        ],
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
              namedExport: true,
              silent: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                sourceMap: true,
                use: configs.stylus.plugins,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/template.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Running here http://localhost:${port}`],
        notes: ['Happy coding'],
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
    }),
  ],
}

module.exports = merge(common, dev)
