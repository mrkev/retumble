import React from 'react'
import ReactDOM from 'react-dom'
import Lang from '../src/Lang.jsx'
import Helmet from 'react-helmet'

let TumblrBlog = require('../src/TumblrBlog.jsx').default
let Blog = require("val-loader!./includes.js").default

// Load the blog
const place = () => {
  if (!window.object) throw new Error("RIP")
  window.lang = new Lang(window.object) // removes lang:* entries
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

