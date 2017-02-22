
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


/*** ***/

/** Delimits the blog object in a react theme. */
const bobj_del         = `/*${586}` + 'f3690*/';
/** Identifies a react theme. All react themes should include this. */
const theme_identifier = '<!-- 6f011cda-9e1c-11e6-b4f7-531e647e5630 -->'

const json_from_string = function (s) {
  console.log('leggo')
  // [\s\S] matches all whitespace and non-whitespace characters
  s = s.replace(/'.*(\n).*'/g, match => {
    return match.replace(/\n/g, '')
  }).replace(/".*(\n).*"/g, match => {
    return match.replace(/\n/g, '')
  })
  //.replace(/\\x0a/g, '')   // gets evaled to newline by js before acutal evaluation happens, so it breaks eval(), cause javascript doesn't support multine strings
  //.replace(/\\'/g, '\\\\') // for some reason there's strings with \' instead of like unicode escapes
  //s = unescape(escape(s).replace(/%0A/g, ''))
  //console.log(s)
  var res;
  try { eval("res = " + s); return res; }
  catch (e) { console.error(e); return null; }
}

let is_theme = file =>
  file && file.toString().indexOf(theme_identifier) > -1;

const string_from_html = function (file) {
  if (!is_theme(file)) { return null }
  else return Promise.resolve(file)
  .then(local => {
    let middle = local && local
      .between(bobj_del + ' `', '` ' + bobj_del)
      .replace(/\\x0a/g, '')   // gets evaled to newline by js before acutal evaluation happens, so it breaks eval(), cause javascript doesn't support multine strings
      .replace(/\\'/g, '\\\\') // for some reason there's strings with \' instead of like unicode escapes
      return middle;
  })
}



module.exports = {
  json_from_string,
  string_from_html
}
