import terminalImage from 'terminal-image'
import path from 'path'

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  ;(async () => {
    console.log(await terminalImage.file(path.resolve(__dirname, './assets/neo.jpg')))
  })()
}
