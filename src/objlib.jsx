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

const insertScript = (elem, src) => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.appendChild(document.createTextNode(src));
    elem.appendChild(script);
}

const insertHTML = (elem, src) => {
    //var script = document.createElement("script");
    //script.type = "text/javascript";
    //script.appendChild(document.createTextNode(src));
    // elem.appendChild(script);
    elem.innerHTML = src;
}

export default {
  obj2arr,
  html_insert,
  insertScript,
  insertHTML,
}
