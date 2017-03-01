import React from 'react'
import Waypoint from '../../node_modules/react-waypoint/build/waypoint.js'
import ProgressButton from 'react-progress-button'
require("./react-progress-button.css")
import lib from '../lib/obj.jsx'
import 'whatwg-fetch' // For getting next pages
import { getPage } from '../lib/extract.js'

export default class InfiniteIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = this.props.Index;
    this.state.query = '' // '', loading, success, error or disabled
    this.state.buttonText = 'more'
    if (this.state.Pagination.CurrentPage >= this.state.Pagination.TotalPages) {
      this.state.query = 'disabled'
      this.state.buttonText = 'that\'s it!'
      return;
    }
  }

	// todo; what happens when the end is reached
  nextIndex () {
    if (this.state.Pagination.CurrentPage >= this.state.Pagination.TotalPages) {
      return;
    }
    this.setState({ query : 'loading' })
    getPage(this.state.Pagination.Next)
      .catch(e => {
        this.setState({ query : 'error' })
        console.error('error fetchig next index')
        console.error(e)
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
          {this.state.buttonText}
        </ProgressButton>
      </div>
    )
  }
}
