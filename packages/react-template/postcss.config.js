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
    [
      'cssnano',
      {
        preset: 'advanced',
        autoprefixer: false,
      },
    ],
  ],
}
