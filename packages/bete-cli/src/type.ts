export interface Argv {
  _?: string[]
  help?: boolean
  h?: boolean
  version?: boolean
  v?: boolean
  config?: string
  c?: string
  init?: boolean
  port?: number
  base?: string
  outDir?: string
  assetsDir?: string
  sourcemap?: boolean
  minify?: boolean | 'terser' | 'esbuild'
  mode?: 'development' | 'production'
  m?: 'development' | 'production'
  ssr?: boolean
  command?: 'build' | 'start' | 'test'
}

export interface Config {
  port?: number
  outDir?: string
  base?: string
  assetsDir?: string
}
