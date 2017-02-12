import React from 'react'
import Post from './Post.jsx'
import lib from '../objlib.jsx'

export default class PostPhoto extends Post {
  constructor(props) {
    super(props)

    // Caption -> body()
    this.body = lib.html_insert(this.Caption)
    delete this.Caption

    // ... -> photos()
    this.photos = this.photos
      .bind({
        LinkOpenTag  : this['LinkOpenTag'],
        LinkCloseTag : this['LinkCloseTag'],
        'PhotoURL-500'  : this['PhotoURL-500'],
        PhotoAlt     : this['PhotoAlt'],
        'Video-500'  : this['Video-500'],
      })

    delete this['LinkOpenTag']
    delete this['LinkCloseTag']
    delete this['PhotoURL-500']
    delete this['PhotoAlt']
    delete this['Video-500']
  }

  photos() {

    if (this["Video-500"]) {
      return (
        <div className="TP-videoplayer"
             dangerouslySetInnerHTML={{__html: this['Video-500']}}>
        </div>
      )
    } else {
      return (
        <div className="pp-photo"
             dangerouslySetInnerHTML={{__html: '' +
                this.LinkOpenTag + '\n' +
                '<img src="' + this["PhotoURL-500"] +
                '" alt="' + this.PhotoAlt + '" />' +
                this.LinkCloseTag
             }}>
        </div>
      )
    }
  }
}