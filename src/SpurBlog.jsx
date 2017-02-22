import React from 'react'

export default class SpurBlog extends React.Component {
  constructor(props) {
    super(props)
    if (window.state) {
      this.state = window.state
    }
  }
}
