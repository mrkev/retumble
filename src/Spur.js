import InfiniteIndex from './components/InfiniteIndex.jsx'
import { getPage } from './lib/extract.js'
import PostNotes from './components/PostNotes.jsx'

const lang = new Proxy({}, {
  get: (target, name) => name in window.lang ? window.lang[name] : 'dep'
})

export default {
  getPage,
  InfiniteIndex,
  PostNotes,
  Strings: lang,
}
