const plugins = [];
if (process.env.NODE_ENV === "production") {
  // 移除console.log
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: [
    [
      "@vue/app",
      {
        // polyfills: [
        //   "es6.promise",
        //   "es6.symbol",
        //   "es7.array.includes",
        //   "es6.string.includes",
        //   "es6.array.find",
        //   "es6.object.assign"
        // ]
      }
    ]
  ],
  plugins
};
