import React from 'react'
import Post from './Post.jsx'
import lib from '../lib/obj.jsx'

export default class PostText extends Post {
  constructor(props) {
    super(props)
    // Body -> body()
    this.body = lib.html_insert(this.Body)
    delete this.Body
  }
}