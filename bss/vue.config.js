const proxyTarget = 'http://erp-system.mofangge.net/api'	// 测试
// const proxyTarget = "http://dev-erp-manage.mofangge.cc/api"; // 开发环境
//const proxyTarget = "http://172.16.40.69:7117"; // lzz
const proxy = {
  "/merchant": {
    target: proxyTarget,
    secure: false,
    changeOrigin: true
  },
  "/user": {
    target: proxyTarget, // 学习
    secure: false,
    changeOrigin: true
  },
  "/common": {
    target: proxyTarget, // 公共
    secure: false,
    changeOrigin: true
  }
};
const isProduction = process.env.NODE_ENV === "production";
const compactJSCdnAddressArrdev = [
  "//shadow.elemecdn.com/bundle/npm/vue@2.5.17/dist/vue.js",
  "npm/vue-router@3.0.1/dist/vue-router.min.js",
  "npm/vuex@3/dist/vuex.min.js",
  "npm/axios@0.17.1/dist/axios.min.js"
];
const compactJSCdnAddressArrbuild = [
  "//shadow.elemecdn.com/bundle/npm/vue@2.5.17/dist/vue.runtime.min.js",
  "npm/vue-router@3.0.1/dist/vue-router.min.js",
  "npm/vuex@3/dist/vuex.min.js",
  "npm/axios@0.17.1/dist/axios.min.js"
];
module.exports = {
  publicPath: "./",
  configureWebpack: {
    externals: {
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
      vue: "Vue"
    }
  },
  chainWebpack(config) {
    config.plugin("fork-ts-checker").tap(([options]) => {
      options.formatter = require("./config/format-message");
      return [options];
    });
    config.plugin("html").tap(args => {
      const compactJSCdnAddressArr = isProduction
        ? compactJSCdnAddressArrbuild
        : compactJSCdnAddressArrdev;
      args[0].cdn = compactJSCdnAddressArr.join(",");
      return args;
    });
  },
  devServer: {
    proxy
  }
};
