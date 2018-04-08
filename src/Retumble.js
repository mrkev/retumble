import InfiniteIndex from './components/InfiniteIndex.jsx';
import { getPage } from './lib/extract.js';
import PostNotes from './components/PostNotes.jsx';

export const Strings = new Proxy({}, {
  get: (target, name) => name in window.lang ? window.lang[name] : undefined,
});

export { InfiniteIndex, PostNotes, getPage };