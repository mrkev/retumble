import React from 'react'
import Post from './Post.jsx'
import lib from '../lib/obj.jsx'

export default class PostLink extends Post {
  constructor(props) {
    super(props)

    // Description -> body()
    this.body = lib.html_insert(this.Description)
    this.Target = this.Target || "_self"
    delete this.Description

  }
}
