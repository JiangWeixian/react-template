// refs: https://github.com/vuejs/vue-cli/blob/v2/lib/logger.js
import { format } from 'util'
import chalk from 'chalk'

/**
 * Prefix.
 */
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

const log = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(chalk.bgBlue.black(' info '), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

const fatal = (...args: [any, ...any[]]) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.bgRed.black(' failed '), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

const success = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(chalk.bgGreen.black(' success '), sep, msg)
}

export default {
  log,
  fatal,
  success,
}
