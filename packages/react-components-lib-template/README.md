# @aiou/react-components-lib-template
*build multiple react components lib, insipred by [antd-tools](https://github.com/ant-design/antd-tools)*

[![npm](https://img.shields.io/npm/v/@aiou/react-components-lib-template)](https://github.com/JiangWeixian/templates/tree/master/packages/react-components-lib-template) [![GitHub](https://img.shields.io/npm/l/@aiou/react-components-lib-template)](https://github.com/JiangWeixian/templates/tree/master/packages/react-components-lib-template)


# features

- output `lib & es` components version
- build with `gulp`
- multiple react components
- support css-modules

## install

```console
yarn add @aiou/react-components-lib-template
```

## usage

### with babel-plugin-import

- use with `umi`
  
  ```js
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@aiou/react-components-lib-template',
        style: 'css',
      },
    ],
  ]
  ```

## development

- **Setup** - `yarn * yarn dev`
- **Build** - `yarn build`


## Q&A

- import external `stylus lib`
  
  ```js
  .pipe(
    stylus({
      'include css': true,
      set: ['resolve url'],
      use: [plugin()], // some stylus plugin like nib
      import: [
        path.resolve(
          __dirname,
          'path/index.styl', // external stylus path
        ),
        path.resolve(__dirname, 'components/style/gray.styl'),
      ],
    }),
  )
  
  ```

  - `css-modules` - in `build/postcss.config.js`