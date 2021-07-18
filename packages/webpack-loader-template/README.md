# @aiou/webpack-loader-template
*build webpack loader*

[![npm](https://img.shields.io/npm/v/@aiou/webpack-loader-template)](https://github.com/JiangWeixian/templates/tree/master/packages/webpack-loader-template) [![GitHub](https://img.shields.io/npm/l/@aiou/webpack-loader-template)](https://github.com/JiangWeixian/templates/tree/master/packages/webpack-loader-template)

## install

```console
yarn add @aiou/webpack-loader-template -D
```

## features

- Watch mode
- Build with `tsc`
- Replace `alias` path to `real` path

## development

- **Setup** - `yarn * yarn dev`
- **Build** - `yarn build`

## Q&A

- the exec queue of webpack-loaders
   
   ```js
   [
     {
       loader: 'loader-one'
     },
     {
       loader: 'loader-two'
     },
   ]
   ```

   `loader-two` is before `loader-one`

- how webpack-loader work
  
  webpack output resource-file in string-format to webpack-loader
