import { minimist, chalk } from '@bete/utils'

const argv = minimist(process.argv.slice(2))

const command = argv._[0]
const defaultMode = command === 'build' ? 'production' : 'development'

function logHelp() {
  console.log(`
  Usage: bete [command] [args] [--options]
  Commands:
    bete start                 Start server in current directory.
    bete build [root=cwd]      Build target directory.
  Options:
    --help, -h                 [boolean] show help
    --version, -v              [boolean] show version
    --config, -c               [string]  use specified config file
    --port                     [number]  port to use for serve
    --base                     [string]  public base path for build (default: /)
    --outDir                   [string]  output directory for build (default: dist)
    --assetsDir                [string]  directory under outDir to place assets in (default: assets)
    --assetsInlineLimit        [number]  static asset base64 inline threshold in bytes (default: 4096)
    --sourcemap                [boolean] output source maps for build (default: false)
    --minify                   [boolean | 'terser' | 'esbuild'] enable/disable minification, or specify
                                         minifier to use. (default: 'terser')
    --mode, -m                 [string]  specify env mode (default: 'development' for dev, 'production' for build)
    --ssr                      [boolean] build for server-side rendering
  `)
}

console.log(chalk.cyan(`bete v${require('../package.json').version}`))
;(async () => {
  const { help, h, mode, m, version, v } = argv

  if (help || h) {
    logHelp()
    return
  } else if (version || v) {
    return
  }
})()
