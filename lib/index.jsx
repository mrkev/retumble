/** The main run-time entry point */

import React from "react";
import ReactDOM from "react-dom";
import lang from "../src/Lang.js";
import Helmet from "react-helmet";

let tumblrBlog = require("../src/TumblrBlog.js").default;
// $FlowFixMe
let Blog = require("val-loader!./includes.js").default;

// Load the blog
const place = () => {
  if (!window.object) throw new Error("RIP");
  window.lang = lang(window.object); // removes lang:* entries
  window.props = tumblrBlog(window.object, Blog.options);

  const entry = document.getElementById("blog");
  if (!entry) throw new Error("No entry DOM element.");

  ReactDOM.render(
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
      </Helmet>
      <Blog {...window.props} />
    </div>,
    entry
  );
};

place();

if (module.hot) {
  // Whenever a new version of App.js is available
  // $FlowFixMe
  module.hot.accept(
    ["val-loader!./includes.js", "../src/TumblrBlog.js"],
    () => {
      // Require the new version and render it instead
      tumblrBlog = require("../src/TumblrBlog.js").default;
      // $FlowFixMe
      Blog = require("val-loader!./includes.js").default;
      place();
    }
  );
}
