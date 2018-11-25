// @flow
import { getPage } from "./lib/extract.js";

// TODO: expose to user? necessary?
function isHomePage(props: Object) {
  return props.IndexPage && props.Pagination.CurrentPage === "1";
}

export const Strings = new Proxy(
  {},
  {
    get: (target, name) =>
      name in window.lang ? window.lang[name] : undefined,
  }
);

export { getPage };
