<div align="center">

![logo](/docs/logo.png)

*the one - neo*

[![npm](https://img.shields.io/npm/v/@aiou/neo)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates)](https://github.com/JiangWeixian/templates/tree/master/packages/core)

<img src="https://user-images.githubusercontent.com/6839576/83341699-f436dc00-a318-11ea-9cf5-60b4ee16cfa7.gif" width="640" />

</div>


## table of contents

- [table of contents](#table-of-contents)
- [install](#install)
- [commands](#commands)
  - [whoami](#whoami)
  - [list](#list)
  - [create](#create)
- [templates](#templates)
  - [`bin-template`](#bin-template)
  - [`chrome-extenstion-template`](#chrome-extenstion-template)
  - [`dayjs-plugin-template`](#dayjs-plugin-template)
  - [`eslint-config-template`](#eslint-config-template)
  - [`(WIP)nextjs-rematch2-template`](#wipnextjs-rematch2-template)
  - [original-html-template](#original-html-template)
  - [react-components-lib-template](#react-components-lib-template)
  - [react-template](#react-template)
  - [rollup-template](#rollup-template)
  - [ts-lib-template](#ts-lib-template)
  - [webpack-loader-template](#webpack-loader-template)

## install

```bash
npm install @aiou/neo -g
```

## commands

### whoami

```bash
neo whoami
```

<div align='center'>

![whoami](/packages/core/src/assets/neo.jpg)  
*▲ whoami*

</div>

### list
> list all templates

```bash
neo list
```

### create
> create [project-name] from [template-name]

```bash
neo create <template-name> [project-name]
```

## templates

### `bin-template`

*build cli application*

- Use [**commander**](https://github.com/tj/commander.js/) build cli application
- Interaction interface with [**inquirer**](https://github.com/SBoudrias/Inquirer.js/)
- Display loading status with [**ora**](https://github.com/sindresorhus/ora)

### `chrome-extenstion-template`

*build chrome crx application*

* Support hot reload
* Build with `webpack`, and to `.zip`
* Build UI interface with `react`
* Process page element with `JQuery`
* Process multiple dom event with `rxjs`

### `dayjs-plugin-template`

*build dayjs plugin lib*

- ✨ build and write with `typescript`
- ✨ good typo define

### `eslint-config-template`

*build eslint plugin lib*

- `on/off` eslint rules
- extends 3rd eslint plugin
- config `prettier`
- lint non `.js/.ts` files


### `(WIP)nextjs-rematch2-template`

*build nextjs ssr web application*

- Mock server
- With `rematch2`
- Styled with `styled-components`

### original-html-template

*build web application without framework*

- Build with webpack
- Visit page via `http:<ip>:8080` in mobile
- Style with `stylus` and useful `Rucksack & Rupture`

### react-components-lib-template
*build multiple react components lib, insipred by [antd-tools](https://github.com/ant-design/antd-tools)*

- output `lib & es` components version
- build with `gulp`
- multiple react components
- support css-modules

### react-template

*build spa react template with pure webpack*

- Pure webpack
- Visit via `http:<ip>:port` on mobile
- Rematch
- With friendly build progress and error output
- Bundle size analyzer

### rollup-template

- output bundlesize
- exclude `dependencies` and `peerDependencies`
  
### ts-lib-template
**build ts lib template**

- Simple build with `tsc`
- Replace `alias` path to `real` path
- Watch mode

### webpack-loader-template


- Watch mode
- Build with `tsc`
- Replace `alias` path to `real` path
