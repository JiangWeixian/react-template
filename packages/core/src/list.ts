import { templates } from './utils/constants'

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * @description List all templates
 */
export const list = () => {
  console.log('  Templates:')
  console.log()
  Object.keys(templates).forEach((k) => {
    console.log(`    * ${k}: ${templates[k]}`)
    console.log()
  })
}
