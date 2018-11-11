// @flow

/*
 * String utilities
 */

/** ssaxxxbss -> xxx */
function between(
  s: string,
  a: string,
  b: string,
  opts: { min: boolean }
): string {
  if (!b) b = a;
  if (opts.min) {
    // min substring
    const noStart = s.substring(s.indexOf(a) + a.length);
    return noStart.substring(0, noStart.indexOf(b));
  } else {
    // max substring
    return s.substring(s.indexOf(a) + a.length, s.lastIndexOf(b));
  }
}

/** ssaxxxbss -> sscss */
function subvert(s: string, a: string, b: string, c: string): string {
  return (
    s.substring(0, s.indexOf(a)) + c + s.substring(s.lastIndexOf(b) + b.length)
  );
}

/** ssaxxxbss -> ssacbss */
function revert(s: string, a: string, b: string, c: string): string {
  return (
    s.substring(0, s.indexOf(a)) +
    a +
    c +
    b +
    s.substring(s.lastIndexOf(b) + b.length)
  );
}

/* String -> RegExp String, for a RegExp that would match that string */
function escapeRegExp(s: string): string {
  return s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

/** Replaces all ocurrences of find with replace on some string */
function replaceAll(s: string, find: string, replace: string): string {
  return s.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

module.exports = {
  between,
  subvert,
  revert,
  escapeRegExp,
  replaceAll,
};
