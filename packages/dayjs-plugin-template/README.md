# @aiou/dayjs-plugin-template
*build dayjs plugin lib*

[![npm](https://img.shields.io/npm/v/@aiou/dayjs-plugin-template)](https://github.com/JiangWeixian/templates/tree/master/packages/dayjs-plugin-template) [![GitHub](https://img.shields.io/npm/l/@aiou/dayjs-plugin-template)](https://github.com/JiangWeixian/templates/tree/master/packages/dayjs-plugin-template)

## features

- ✨ build and write with `typescript`
- ✨ good typo define

## install
> demo usage of this repo

```sh
yarn add @aiou/dayjs-plugin-template dayjs
```

## usage

### `Hello`

```ts
import Hello from '@aiou/dayjs-plugin-template'

dayjs.extend(Hello)
dayjs.hello().say()
```

params of `hello()`

- `word`
