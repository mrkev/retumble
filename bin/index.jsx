import ReactDOM from 'react-dom'
import React from 'react'
import TumblrBlog from '../src/TumblrBlog.jsx'
import extract from '../src/extract'

window.json = extract.json_from_string(window.raw_source)
window.Spur = require('../src/Spur.js').default

// Blog is loaded from target directory
const Blog = require("val-loader!./includes.js").default

/** Parses URL params */
var urlParams; // http://stackoverflow.com/posts/2880929/revisions
(window.onpopstate = function () {
  var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);
    urlParams = {};
  while (match = search.exec(query))
     urlParams[decode(match[1])] = decode(match[2]);
})();

/** Loads the blog */
const place = _ => {
  if (!window.json) window.json = {}

  // Properties of the blog
  window.props = new TumblrBlog(window.json)

  // Posts are state since they can be dynamically loaded.
  // Delete them from props so they aren't repeated.
  // window.state = {}
  // if (window.props.Posts) {
  //   window.state.Posts = window.props.Posts
  //   delete window.props.Posts
  // }

  console.log('rendering')
  ReactDOM.render(
    <Blog {... props} />,
    document.getElementById('blog')
  );
}

place();

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept(['val-loader!./includes.js', '../src/TumblrBlog.jsx'], () => {
    // Require the new version and render it instead
    let TumblrBlog = require('../src/TumblrBlog.jsx')
    let Blog = require('val-loader!./includes.js')
    place()
  })
}

