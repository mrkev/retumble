import React from 'react'

const obj2arr = obj =>
  Object.keys(obj).map(k => obj[k])

/**
 * Creates an html-insert function
 */
const html_insert = html => props => {
  if (!html) return null
  props = props || {}
  return (
    <div {... props}
      dangerouslySetInnerHTML={{__html: html}}>
    </div>
  )
}

export default {
  obj2arr,
  html_insert,
}