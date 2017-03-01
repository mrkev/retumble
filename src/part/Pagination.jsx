import React from 'react'
import lib from '../lib/obj.jsx'

export default class Pagination {
  constructor(props) {
    // Take all properites
    Object.keys(props).forEach(k => this[k] = props[k])

    if (this.CurrentPage) this.CurrentPage = parseInt(this.CurrentPage)
    if (this.TotalPages) this.TotalPages = parseInt(this.TotalPages)
    this.Previous = this.PreviousPost || this.PreviousPage
    this.Next = this.NextPost || this.NextPage
    delete this.PreviousPost
    delete this.PreviousPage
    delete this.NextPost
    delete this.NextPage
  }
}

