// @flow
import InfiniteIndex from "./components/InfiniteIndex.jsx";
import { getPage } from "./lib/extract.js";
import PostNotes from "./components/PostNotes.jsx";

export const Strings = new Proxy(
  {},
  {
    get: (target, name) =>
      name in window.lang ? window.lang[name] : undefined,
  }
);

// TODO: expose to user? necessary?
function isHomePage(props: Object) {
  return props.IndexPage && props.Pagination.CurrentPage === "1";
}

export { InfiniteIndex, PostNotes, getPage };
