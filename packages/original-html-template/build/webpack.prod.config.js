const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MergeWebpack = require('webpack-merge')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const configs = require('./config').prod
const baseWebpackConfig = require('./webpack.common.config')

const prodWebpackConfig = {
  devtool: 'source-map',
  mode: configs.mode,
  output: {
    path: configs.distPath,
    filename: path.posix.join(configs.staticFolder, 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join(configs.staticFolder, 'js/[name].[chunkhash].async.js'),
    publicPath: configs.publicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: function(module) {
            return module.resource && /react/.test(module.resource)
          },
          name: 'vendors',
          chunks: 'all',
          priority: -10,
        },
        commons: {
          chunks: 'async',
          name: 'async',
          minChunks: 2,
          minSize: 0,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        extractComments: false,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          discardComments: { removeAll: true },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCSSExtractPlugin.loader, options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: MiniCSSExtractPlugin.loader, options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              use: configs.stylusPlugins,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: ['vendors', 'main'],
    }),
    new MiniCSSExtractPlugin({
      filename: path.posix.join(configs.staticFolder, 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join(configs.staticFolder, 'css/[name].[contenthash].async.css'),
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
    }),
  ],
}

module.exports = MergeWebpack(baseWebpackConfig, prodWebpackConfig)
