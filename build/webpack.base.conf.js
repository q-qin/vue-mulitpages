var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')

var glob = require('glob');
//// 模块名称
var project = 'activities';
var entries =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.js'); // 获得入口js文件
//var entries =  utils.getMultiEntry('./src/views/'+project+'/**/*.html'); // 获得入口js文件
var chunks = Object.keys(entries);
console.log(chunks)

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var env = process.env.NODE_ENV
console.log('current env:',env)

// for development 
if(env === 'development'){
  var _assetsRoot = config.dev.assetsRoot
  var _assetsPublicPath = config.dev.assetsPublicPath
}
// for testing
if(env === 'test'){
  var _assetsRoot = config.test.assetsRoot
  var _assetsPublicPath = config.test.assetsPublicPath
}
// for production
if(env === 'production'){
  var _assetsRoot = config.build.assetsRoot
  var _assetsPublicPath = config.build.assetsPublicPath
}

var projectRoot = path.resolve(__dirname, '../')

var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {

  entry:entries,
  output: {
    path: _assetsRoot,
    filename: '[name].js',
    publicPath: _assetsPublicPath
  },
  // externals:{
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex':'Vuex'
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      '@': path.resolve(__dirname, '../src'),
      'conf': process.env.NODE_ENV === 'production'?'@/assets/js/conf.js':'@/assets/js/conf-test.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]'),
          publicPath:process.env.NODE_ENV === 'development'?'/':'/v2/',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
      
    ]
  },
  plugins: [
	/*
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: 4 || chunks.length //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。

    }),*/
   
  ]
}

module.exports =  webpackConfig
