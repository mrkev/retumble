/* Loads the blog file specified by
   the theme's package.json */
const path = require("path");
const theme_pkg = require(path.join(process.cwd(), 'package.json'))
const file = path.join(process.cwd(), theme_pkg.main);

module.exports = function () {
  return { code: `
console.log('~ retumble web ~');
module.exports = require('${file}')
`
}}