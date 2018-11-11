// @flow

type Lang = {
  [string]: string,
};

export default function lang(obj: Object) {
  const lang: Lang = {};
  // todo; Make a process(window.object) -> (Lang, TumblrBlog)
  // todo; move into window.object.lang and don't delete (for debugging)
  Object.keys(obj).forEach(x => {
    if (x.indexOf("lang:") === 0) {
      lang[x.replace("lang:", "")] = obj[x];
      delete obj[x];
    }
  });
  return lang;
}
