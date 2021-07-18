const path = require('path')
const { defaults: tsjPreset, jsWithTsESM, jsWithBabelESM } = require('ts-jest/presets')

/**
 * @see {@link https://huafu.github.io/ts-jest/user/config/}
 */
module.exports = {
  verbose: true,
  collectCoverage: true,
  globals: {
    NODE_ENV: 'test',
    'ts-jest': {
      diagnostics: false,
    },
  },
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname, './'),
  moduleFileExtensions: ['tsx', 'jsx', 'js', 'ts'],
  moduleNameMapper: {
    '@/components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  transform: {
    ...jsWithBabelESM.transform,
    ...tsjPreset.transform,
    ...jsWithTsESM.transform,
  },
  setupFiles: ['jest-localstorage-mock'],
}
