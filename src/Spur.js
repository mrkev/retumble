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

// todo; Make a process(window.object) -> (Lang, TumblrBlog)
const Lang = {}
Object.keys(window.Object).forEach(x => {
  if (x.indexOf('lang:') === 0) {
    Lang[x.replace('lang:', '')] = window.json[x]
    delete window.json[x]
  }
})

import Waypoint from '../node_modules/react-waypoint/build/waypoint.js'
import ProgressButton from 'react-progress-button'
import "./css/react-progress-button.css"

class InfiniteIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = this.props.Index;
    this.state.query = '' // '', loading, success, error or disabled
  }

	// todo; what happens when the end is reached
  nextIndex () {
    this.setState({ query : 'loading' })
    getIndexPage(this.state.Pagination.NextPage)
      .catch(x => {
        this.setState({ query : 'error' })
        console.error('error fetchig next index')
      })
      .then(blog => {
        const index = blog.Index
        index.Posts = this.state.Posts.concat(index.Posts)
        this.setState(index)
        this.setState({ query : '' })
      })
  }

  render () {
    return (
      <div id="content">
        {this.state.Posts.map((post, i) =>
          <this.props.PostComponent {...post} key={i} />
        )}
				<Waypoint onEnter={this.nextIndex.bind(this)} />
        <ProgressButton
            onClick={this.nextIndex.bind(this)}
            state={this.state.query}>
          more
        </ProgressButton>
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
