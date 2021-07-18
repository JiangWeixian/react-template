import Webpack from 'webpack'

import { getOptions } from './utils/options'
import { Options } from './typings'

function loader(this: Webpack.LoaderContext<Options>, source: string) {
  const options = getOptions(this)
  if (options.include && options.exclude) {
    return source
  }
  return source
}

export default loader
