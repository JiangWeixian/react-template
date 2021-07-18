const path = require('path')

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
      tsConfig: 'tsconfig.test.json',
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
    '\\.[jt]sx?$': 'babel-jest',
  },
  setupFiles: ['jest-localstorage-mock'],
}
