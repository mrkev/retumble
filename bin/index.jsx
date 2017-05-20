import React from 'react'
import ReactDOM from 'react-dom'
import Lang from '../src/Lang.jsx'
import Helmet from 'react-helmet'

let TumblrBlog = require('../src/TumblrBlog.jsx').default

// Blog is loaded from target directory
let Blog = require("val-loader!./includes.js").default

// Spur is available to the user
window.Spur = require('../src/Spur.js').default

// Parse URL params
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

// Load the blog
const place = () => {
  if (!window.object) throw new Error("RIP")
  window.Spur.lang = new Lang(window.object) // removes lang:* entries
  window.props = new TumblrBlog(window.object, Blog.options)

  console.log('rendering')
  ReactDOM.render(
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
      </Helmet>
      <Blog {... props} />
    </div>
    ,
    document.getElementById('blog')
  );
}

place();

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept(['val-loader!./includes.js', '../src/TumblrBlog.jsx'], () => {
    // Require the new version and render it instead
    TumblrBlog = require('../src/TumblrBlog.jsx').default
    Blog = require('val-loader!./includes.js').default
    place()
  })
}

