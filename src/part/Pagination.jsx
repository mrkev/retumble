import React from 'react'
import lib from '../objlib.jsx'

export default class Pagination {
  constructor(props) {
    // Take all properites
    console.log(this)
    Object.keys(props).forEach(k => this[k] = props[k])
    this.CurrentPage = parseInt(this.CurrentPage)
    this.TotalPages = parseInt(this.TotalPages)
  }
}

