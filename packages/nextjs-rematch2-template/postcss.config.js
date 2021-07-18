module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          browserslits: ['> 1%'],
        },
      },
    ],
    'rucksack-css',
    'postcss-import',
    'postcss-url',
    'postcss-write-svg',
    [
      'cssnano',
      {
        preset: 'advanced',
        autoprefixer: false,
      },
    ],
  ],
}
