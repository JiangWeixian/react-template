const fs = require('fs-extra')
const path = require('path')

const commands = ['create', 'list', 'whoami', '']
const formats = ['neo']
const fakelib = path.resolve(__dirname, '../.lib')
const reallib = path.resolve(__dirname, '../lib')

fs.copySync(path.join(fakelib, '/utils'), path.join(reallib, '/utils'))

formats.forEach(f => {
  commands.forEach(c => {
    fs.readFile(path.join(fakelib, c ? `${f}-${c}.js` : `${f}.js`), (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      fs.outputFileSync(
        path.join(reallib, c ? `${f}-${c}` : `${f}`),
        '#!/usr/bin/env node\n' + data.toString(),
      )
    })
  })
})

fs.copySync(path.resolve(__dirname, '../src/assets'), path.join(reallib, './assets'))
