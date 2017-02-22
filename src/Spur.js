import 'whatwg-fetch' // For getting next pages
import extract from './extract.js'
import lib from './objlib.jsx'
import SpurBlog from './SpurBlog.jsx'

const getIndexPage = page => {
  return fetch(page)
  .then(response => response.text())
  .then(body => body && extract.string_from_html(body))
  .then(ostr => ostr && extract.json_from_string(ostr))
  .then(json => json && lib.obj2arr(json.Posts))
}

const Lang = {}
Object.keys(window.json).forEach(x => {
  if (x.indexOf('lang:') === 0) {
    Lang[x.replace('lang:', '')] = window.json[x]
    delete window.json[x]
  }
})

export default {
  Blog : SpurBlog,
  getIndexPage,
  Lang,
}
