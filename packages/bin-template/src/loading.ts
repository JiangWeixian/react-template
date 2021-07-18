import ora from 'ora'

import logger from './utils/logger'

const spinner = ora('Loading')

type Options = {
  text?: string
}

export const loading = (
  ms: number = 1000,
  { text = 'bin-template' }: Options = { text: 'bin-template' },
) => {
  try {
    spinner.text = text
    spinner.start()
    setTimeout(() => {
      spinner.stop()
      logger.success('💅')
    }, ms)
  } catch (e) {
    logger.fatal(e)
  }
}
