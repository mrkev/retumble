import 'whatwg-fetch' // For getting next pages
import extract from './extract.js'
import lib from './objlib.jsx'
import SpurBlog from './SpurBlog.jsx'
import React from 'react'
import TumblrBlog from './TumblrBlog.jsx'

const getIndexPage = page => {
  return fetch(page)
  .then(response => response.text())
  .then(body => body && extract.string_from_html(body))
  .then(ostr => ostr && extract.json_from_string(ostr))
  .then(json => json && new TumblrBlog(json))
}

const Lang = {}
Object.keys(window.json).forEach(x => {
  if (x.indexOf('lang:') === 0) {
    Lang[x.replace('lang:', '')] = window.json[x]
    delete window.json[x]
  }
})

import Waypoint from '../node_modules/react-waypoint/build/waypoint.js'


class InfiniteIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = this.props.Index;
  }

	// todo; what happens when the end is reached
  testNext () {
    getIndexPage(this.state.Pagination.NextPage)
      .catch(x => console.error('error fetchig'))
      .then(blog => {
        const index = blog.Index
        index.Posts = this.state.Posts.concat(index.Posts)
        this.setState(index)
      })
  }

  render () {
    return (
      <div id="content">
        {this.state.Posts.map((post, i) =>
          <this.props.PostComponent {...post} key={i} />
        )}
				<Waypoint onEnter={this.testNext.bind(this)} />
        <button onClick={this.testNext.bind(this)}>test button</button>
      </div>
    )
  }
}

export default {
  Blog : SpurBlog,
  getIndexPage,
  Lang,
  InfiniteIndex,
}
