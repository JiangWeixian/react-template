const path = require('path')
const withImages = require('next-images')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  webpack: (config) => {
    config.resolve.alias['~'] = path.join(__dirname, '')
    config.resolve.alias['@'] = path.join(__dirname, 'pages')
    return config
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]_[local]_[hash:base64:5]',
  },
  env: {
    IS_MOCK: true,
  },
}

module.exports = withImages(config)
