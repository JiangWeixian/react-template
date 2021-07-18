#!/usr/bin/env node
import { program } from 'commander'
import { hello } from './hello'
import { loading } from './loading'

const cli = program.version(require('../package.json').version).name('bin-template')

cli.command('hello [word]').description('say hello').alias('hi').action(hello)

cli
  .command('loading [ms]')
  .description('loading')
  .option('-t, --text [text]', 'define loading text')
  .action(loading)

program.parse(process.argv)
