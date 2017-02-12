import React from 'react'
import Post from './Post.jsx'
import lib from '../objlib.jsx'

export default class PostLink extends Post {
  constructor(props) {
    super(props)

    // Description -> body()
    this.body = lib.html_insert(this.Description)
    delete this.Description

  }
}
