import { minimist, chalk } from '@bete/utils'
import { resolveConfig } from './config'
import { Config } from './type'

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
    --init                     [boolean] init config file
    --port                     [number]  port to use for serve
    --base                     [string]  public base path for build (default: /)
    --outDir                   [string]  output directory for build (default: dist)
    --assetsDir                [string]  directory under outDir to place assets in (default: assets)
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

  const envMode = mode || m || defaultMode
  const option = resolveOption(envMode)
  const nextConfig = resolveConfig(option)

  if (command === 'build') {
    await runBuild(nextConfig)
  } else if (command === 'start') {
    await runStart(nextConfig)
  }
})()

function resolveOption(mode: string) {
  argv.mode = mode

  // cast xxx=true | false into actual booleans
  Object.keys(argv).forEach(key => {
    if (argv[key] === 'false') {
      argv[key] = false
    }
    if (argv[key] === 'true') {
      argv[key] = true
    }
  })

  if (command) {
    argv.command = command
  }

  return argv
}

async function runBuild(config: Config) {
  try {
    const run = require('./build')
    await run(config)
    process.exit(0)
  } catch (error) {
    console.error(chalk.red(`[bete] Build errored out.`))
    console.error(error)
    process.exit(1)
  }
}

async function runStart(config: Config) {
  try {
    const run = require('./start')
    await run(config)
  } catch (error) {
    console.error(chalk.red(`[bete] start errored out.`))
    console.error(error)
    process.exit(1)
  }
}
