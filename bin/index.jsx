import ReactDOM from 'react-dom'
import React from 'react'
import TumblrBlog from '../src/TumblrBlog.jsx'
const Blog = require("val-loader!./includes.js").default
console.log(Blog)
window.BlogMod = Blog

/** Loads the blog */
const place = _ => {
  const props = new TumblrBlog(window.props)
  window.a = props;
  console.dir(props)
  if (!window.props) window.props = {}
  if (urlParams['render'] !== 'raw') {
    console.log('rendering')
		ReactDOM.render(
      <Blog {... props} />,
      document.getElementById('blog')
    );
  } else {
    document.open();
    document.write(JSON.stringify(props));
    document.close();
  }
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

