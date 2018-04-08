export default class Lang {
  constructor(obj) {
    // todo; Make a process(window.object) -> (Lang, TumblrBlog)
    Object.keys(obj).forEach(x => {
      if (x.indexOf('lang:') === 0) {
        this[x.replace('lang:', '')] = obj[x];
        delete obj[x];
      }
    });
  }
}
