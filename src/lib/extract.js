
/*
 * String utilities
 */

/** ssaxxxbss -> xxx */
String.prototype.between = function(a, b) {
  if (!b) b = a
  return this.substring(this.indexOf(a) + a.length, this.lastIndexOf(b))
};

/** ssaxxxbss -> sscss */
String.prototype.subvert = function(a, b, c) {
  return this.substring(0, this.indexOf(a)) + c + this.substring(this.lastIndexOf(b) + b.length)
};

/* String -> RegExp String, for a RegExp that would match that string */
String.prototype.escapeRegExp = function() {
  return this.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

/** Replaces all ocurrences of find with replace on some string */
String.prototype.replaceAll = function(find, replace) {
  return this.replace(new RegExp(find.escapeRegExp(), 'g'), replace);
}

/** Delimits the blog object in a react theme. */
const bobj_del         = `/*${586}` + 'f3690*/';
/** Identifies a react theme. All react themes should include this. */
const theme_identifier = '<!-- 6f011cda-9e1c-11e6-b4f7-531e647e5630 -->'
const isTheme = file =>
  file && file.toString().indexOf(theme_identifier) > -1;


const t_objt_from_string = function (s) {
  var res;
  try { eval("res = " + s); return res; }
  catch (e) { console.error(e); return null; }
}

const t_string_from_html = function (file) {
  if (!isTheme(file)) { return null }
  else return file.between(bobj_del, bobj_del)
}

const getPage = page => {
  const TumblrBlog = require('../TumblrBlog.jsx').default;
  return fetch(page)
  .then(response => response.text())
  .then(body => body && t_string_from_html(body))
  .then(ostr => ostr && t_objt_from_string(ostr))
  .then(json => json && new TumblrBlog(json))
}

module.exports = {
  t_objt_from_string,
  t_string_from_html,
  isTheme,
  getPage,
}
