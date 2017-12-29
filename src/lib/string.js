
/*
 * String utilities
 */

/** ssaxxxbss -> xxx */
const between = function (s, a, b, opts) {
  if (!b) b = a
  if (opts.min) {
    // min substring
    const noStart = s.substring(s.indexOf(a) + a.length)
    return noStart.substring(0, noStart.indexOf(b))
  } else {
    // max substring
    return s.substring(
      s.indexOf(a) + a.length,
      s.lastIndexOf(b))
  }
};

/** ssaxxxbss -> sscss */
const subvert = function (s, a, b, c) {
  return s.substring(0, s.indexOf(a)) + c + s.substring(s.lastIndexOf(b) + b.length)
};

/** ssaxxxbss -> ssacbss */
const revert = function(s, a, b, c) {
  return s.substring(0, s.indexOf(a)) + a + c + b + s.substring(s.lastIndexOf(b) + b.length)
};

/* String -> RegExp String, for a RegExp that would match that string */
const escapeRegExp = function (s) {
  return s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

/** Replaces all ocurrences of find with replace on some string */
const replaceAll = function (s, find, replace) {
  return s.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports = {
  between,
  subvert,
  revert,
  escapeRegExp,
  replaceAll,
}