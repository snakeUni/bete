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
  /**
   * mode 的简写
   */
  m?: 'development' | 'production'
  ssr?: boolean
  command?: 'build' | 'start' | 'test'
}

export interface Config {
  /**
   * 启动的的端口
   * @default 3000
   */
  port?: number
  /**
   * 输出的文件目录
   * @default 'dist'
   */
  outDir?: string
  /**
   * Base public path when served in production.
   * @default '/'
   */
  base?: string
  /**
   * Directory relative from `outDir`
   * @default 'dist/assets'
   */
  assetsDir?: string
  /**
   * Whether to generate sourcemap
   * @default false
   */
  sourcemap?: boolean
  /**
   * Set to `false` to dsiable minification, or specify the minifier to use.
   * Available options are 'terser' or 'esbuild'.
   * @default 'terser'
   */
  minify?: boolean | 'terser' | 'esbuild'
  /**
   * Build for server-side rendering
   * if CLI use ssr
   * @internal
   */
  ssr?: boolean
}
