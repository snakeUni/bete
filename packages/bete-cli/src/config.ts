import { Argv, Config } from './type'

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
  return mergeObject(defaultConfig, argv)
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
