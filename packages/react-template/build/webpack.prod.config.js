const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const SizePlugin = require('size-plugin')
const WebpackBar = require('webpackbar')
const { merge } = require('webpack-merge')

const configs = require('./config')
const common = require('./webpack.common.config')

/**
 * @type import('webpack').Configuration
 */
const prod = {
  devtool: 'source-map',
  mode: 'production',
  stats: 'errors-only',
  output: {
    path: configs.path.output,
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('static', 'js/[name].[chunkhash].async.js'),
    publicPath: './',
  },
  optimization: {
    moduleIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: function (module) {
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
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'advanced',
            {
              autoprefixer: false,
            },
          ],
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
          { loader: MiniCSSExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/template.html',
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
      filename: path.posix.join('static', 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join('static', 'css/[name].[contenthash].async.css'),
    }),

    ...(configs.analyzer
      ? [
          new BundleAnalyzerPlugin({
            openAnalyzer: true,
          }),
        ]
      : []),
    new CompressionPlugin(),
    new SizePlugin(),
    new WebpackBar({
      profile: true,
    }),
  ],
}

module.exports = merge(common, prod)
