const { defaults: tsjPreset, jsWithTsESM, jsWithBabelESM } = require('ts-jest/presets')

module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './jest/coverage',
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    ...jsWithBabelESM.transform,
    ...tsjPreset.transform,
    ...jsWithTsESM.transform,
  },
  testRegex: '/test/.+\\.test\\.tsx?$',
  verbose: false,
}
