/*
 * String utilities
 */

/** ssaxxxbss -> xxx */
String.prototype.between = function(a, b) {
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

const load_project = parent => {
  /* Hack necessary for webpack to work,
  since it can only do static module following.
  This could be made unecessary by modifying index.jsx
  on the go, writing it to disk and then webpacking it
  I suppose */

  fs.unlinkSync(path.join(parent, 'link'))
  fs.linkSync(process.cwd(), path.join(parent, 'link'))
}

module.exports = {
  load_project: load_project,
}