import React from 'react'
import lib from '../lib/obj.jsx'
import 'whatwg-fetch' // For getting next pages
import ProgressButton from 'react-progress-button'
import Waypoint from '../../node_modules/react-waypoint/build/waypoint.js'
import { getPage } from '../lib/extract.js'
require("./react-progress-button.css")

export default class InfiniteIndex extends React.Component {

  constructor (props) {
    super(props)

    // The Index object from the blog object
    this.state = this.props.Index;
    // State of the loading button
    this.state.query = '' // '', loading, success, error or disabled
    // Text on the loading button
    this.state.buttonText = 'more'
    
    if (this.state.Pagination.CurrentPage >= this.state.Pagination.TotalPages) {
      this.state.query = 'disabled'
      this.state.buttonText = 'that\'s it!'
      return;
    }
  }

	// todo; what happens when the end is reached
  nextIndex () {
    // console.log("WAYPOINT ENTER")
    if (this.state.Pagination.CurrentPage >= this.state.Pagination.TotalPages) {
      return;
    }
    this.setState({ query : 'loading' })
    getPage(this.state.Pagination.Next)
      .catch(e => {
        this.setState({ query : 'error' })
        // console.error('error fetchig next index')
        // console.error(e)
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
				<Waypoint
          scrollableAncestor={window}
          debug={false} 
          onEnter={this.nextIndex.bind(this)} />
        <ProgressButton
            onClick={this.nextIndex.bind(this)}
            state={this.state.query}>
          {this.state.buttonText}
        </ProgressButton>
      </div>
    )
  }
}
