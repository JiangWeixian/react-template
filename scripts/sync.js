/**
 * @fileoverview global sync/setting jobs
 */
const fs = require('fs-extra')
const path = require('path')

const files = ['.prettierignore', '.prettierrc', '.eslintrc.js', '.gitignore', 'LICENSE']

const excludes = ['core']

/**
 * sync config files to each target folder
 * @param {string} package target folder name
 * @param {string[]} files sync files
 */
const syncConfigs = (package, files) => {
  files.forEach((f) => {
    fs.copySync(
      path.resolve(__dirname, `../${f}`),
      path.resolve(__dirname, `../packages/${package}/${f}`),
    )
  })
}

/**
 * sync .github folder
 * @param {string} package package in packages folder
 */
const syncGithub = (package) => {
  fs.copySync(
    path.resolve(__dirname, `../.github`),
    path.resolve(__dirname, `../packages/${package}/.github`),
  )
}

/**
 * sync root ['.prettierignore', '.prettierrc', '.eslintrc.js', '.gitignore', 'LICENSE'] into `packages\/**\/template`
 * @param {string[]} files
 */
const syncTemplate = (package, files = []) => {
  files.forEach((f) => {
    fs.copySync(
      path.resolve(__dirname, `../${f}`),
      path.resolve(__dirname, `../packages/${package}/template/${f}.tpl`),
    )
  })
}

/**
 * global set packages/*\/package.json
 */
const pkgConfig = (package) => {
  const config = {
    homepage: 'https://github.com/JiangWeixian/templates#readme',
    bugs: {
      url: 'https://github.com/JiangWeixian/templates/issues',
      email: 'jiangweixian1994@gmail.com',
    },
    license: 'MIT',
    author: 'JW <jiangweixian1994@gmail.com> (https://twitter.com/jiangweixian)',
    repository: {
      type: 'git',
      url: 'https://github.com/JiangWeixian/templates',
      directory: `packages/${package}`,
    },
  }
  const pkg = fs.readFileSync(path.resolve(__dirname, `../packages/${package}/package.json`))
  fs.writeJSONSync(
    path.resolve(__dirname, `../packages/${package}/package.json`),
    {
      ...JSON.parse(pkg),
      ...config,
    },
    { spaces: 2 },
  )
}

fs.readdir(path.resolve(__dirname, '../packages')).then((packages) => {
  const _packages = packages.filter((f) => {
    return excludes.findIndex((e) => e === f) < 0
  })
  _packages.forEach((p) => {
    syncConfigs(p, files)
    // syncGithub(p)
    syncTemplate(p, files)
    pkgConfig(p)
  })
})
