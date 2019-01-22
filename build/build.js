require('./check-versions')()

var env = process.env.NODE_ENV

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for '+env+'...')
spinner.start()

var _assetsRoot = (env === 'production'?config.build.assetsRoot:config.test.assetsRoot)
var _assetsSubDirectory = (env === 'production'?config.build.assetsSubDirectory:config.test.assetsSubDirectory)

rm(path.join(_assetsRoot, _assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
