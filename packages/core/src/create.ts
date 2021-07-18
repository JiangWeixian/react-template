// refs: https://github.com/vuejs/vue-cli/blob/v2/bin/vue-init

import ora from 'ora'
import inquirer from 'inquirer'
import path from 'path'
import download from 'download'
import globby from 'globby'
import { exec } from 'child_process'
import { existsSync } from 'fs'

import logger from './utils/logger'
import { templates, TEMPLATES, SCOPE } from './utils/constants'

const rm = require('rimraf').sync
const fsExtra = require('fs-extra')

process.on('exit', () => {
  console.log()
})

const spinner = ora('downloading template')

/**
 * download template .neo folder
 */
const downloadNPM = ({ template }: { template: string }): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    exec(`npm v @${SCOPE}/${template} dist.tarball`, (err, stdout) => {
      if (err) {
        console.log()
        logger.fatal('Failed to download template ' + template + ': ' + err.message.trim())
        return reject(err)
      }
      download(stdout, path.join(process.cwd(), '.neo'), {
        extract: true,
      }).then(() => {
        return resolve(true)
      })
    })
  })
}

/**
 * generate template files
 */
const generate = ({ dest, template }: { dest: string; template: string }) => {
  fsExtra
    .copy(path.join(process.cwd(), '.neo/package'), path.join(process.cwd(), dest))
    .then(() => {
      // remove cache files
      fsExtra.remove(path.join(process.cwd(), '.neo'))
      return true
    })
    .then(() => {
      // generate config files from dest.template folder
      const tplPath = path.join(process.cwd(), dest, 'template')
      const tpls = globby.sync('*.tpl', {
        cwd: tplPath,
        dot: true,
      })
      tpls.forEach((f) => {
        fsExtra.copySync(
          path.join(tplPath, f),
          path.join(process.cwd(), dest, f.replace('.tpl', '')),
        )
      })
      // remove template folder
      fsExtra.removeSync(tplPath)
    })
    .then(() => {
      spinner.stop()
      logger.success(`🎉 ${template} Generated 🎉!`)
    })
}

/**
 * copy downloaded npm package to <projName> folder
 */
const downloadAndGenerate = ({ template, dest }: { template: string; dest: string }) => {
  if (existsSync(template)) rm(template)
  spinner.start()
  downloadNPM({ template })
    .then(() => {
      generate({ dest, template })
    })
    .catch((err) => {
      spinner.stop()
      logger.fatal('Failed to download template ' + template + ': ' + err.message.trim())
    })
}

const validateTemplates = (template: string) => {
  if (!template) {
    return
  }
  return Object.keys(templates).findIndex((v) => v === template) > -1
}

const run = (template: string, project: string) => {
  // validate template in list
  if (!validateTemplates(template)) {
    logger.fatal(`Failed locate ${template}`)
    return
  }
  // project name is required
  if (!project) {
    logger.fatal(`<project-name> is required`)
    return
  }
  downloadAndGenerate({ template, dest: project })
}

/**
 * @description create project from template
 */
export const create = (template: string, project: string) => {
  if (template && project) {
    run(template, project)
  } else {
    console.log()
    inquirer
      .prompt<{ template: TEMPLATES; project: string }>([
        {
          type: 'list',
          name: 'template',
          message: 'Please pick a template',
          choices: Object.keys(templates).map((k) => {
            return {
              name: k,
            }
          }),
          default: 'react-template',
          validate: function (answer) {
            if (!answer) {
              return 'You must choose at least one template.'
            }
            return true
          },
        },
        {
          type: 'input',
          name: 'project',
          message: 'Please enter a project name',
        },
      ])
      .then((answers) => {
        run(answers.template, answers.project)
      })
      .catch(logger.fatal)
  }
}
