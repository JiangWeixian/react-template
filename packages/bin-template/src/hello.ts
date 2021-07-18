import inquirer from 'inquirer'

import logger from './utils/logger'

const words = ['world', '𝔴𝔬𝔯𝔩𝔡', '🅦🅞🅡🅛🅓', '𝚠𝚘𝚛𝚕𝚍']

export const hello = (word: string) => {
  inquirer
    .prompt<{ word: string }>([
      {
        type: 'checkbox',
        name: 'word',
        message: 'Please pick a word',
        choices: words.map((k) => {
          return {
            name: k,
            value: k,
            checked: k === 'react-template' ? true : false,
          }
        }),
      },
    ])
    .then((answers) => {
      logger.log(`hello ${answers.word}`)
    })
    .catch(logger.fatal)
}
