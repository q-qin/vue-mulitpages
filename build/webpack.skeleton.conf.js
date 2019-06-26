const path = require('path')
 
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
module.exports = {
  entry: {
    app: resolve('../src/skeleton.entry.js')
  },
}