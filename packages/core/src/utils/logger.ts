import { format } from 'util'
import chalk from 'chalk'

/**
 * Prefix.
 */
const prefix = ' neo '
const sep = chalk.gray('·')

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */
const log = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(chalk.bgBlue.black(prefix), sep, msg)
}

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

const fatal = (...args: [any, ...any[]]) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.bgRed.black(prefix), sep, msg)
  process.exit(1)
}

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

const success = (...args: [any, ...any[]]) => {
  const msg = format.apply(format, args)
  console.log(chalk.bgGreen.black(prefix), sep, msg)
}

export default {
  log,
  fatal,
  success,
}
