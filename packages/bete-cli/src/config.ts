import { resolveApp, fsExtra, chalk } from '@bete/utils'
import { Argv, Config } from './type'
import path from 'path'

const defaultConfig: Config = {
  /**
   * 默认端口
   */
  port: 3000,
  /**
   * 编译后的输出目录
   */
  outDir: 'dist',
  base: '/',
  assetsDir: 'dist/assets'
}

export function resolveConfig(argv: Argv) {
  const config = getNextConfig()
  return mergeObject(config, argv)
}

const mergeObject = (sourceObject: Config, targetObject: Argv) => {
  const keys = Object.keys(sourceObject)
  const nextSourceObject: Config = { ...sourceObject }
  keys.forEach(key => {
    if ((targetObject as any)[key] !== undefined) {
      ;(nextSourceObject as any)[key] = (targetObject as any)[key]
    }
  })

  return nextSourceObject
}

const getNextConfig = () => {
  const beteConfigPath = resolveApp('bete.config.js')
  if (fsExtra.existsSync(beteConfigPath)) {
    const beteConfig = require(beteConfigPath)
    return { ...defaultConfig, ...beteConfig }
  } else {
    console.log(chalk.red('bete.config.js does not exist.'))
    process.exit(1)
  }
}
