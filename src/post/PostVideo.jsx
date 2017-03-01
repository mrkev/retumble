import React from 'react'
import Post from './Post.jsx'
import lib from '../lib/obj.jsx'

export default class PostVideo extends Post {
  constructor(props) {
    super(props)

    // Caption -> body()
    this.body = lib.html_insert(this.Caption)
    delete this.Caption

    // Video-500 -> player()
    this.player = this.player
        .bind({"Video-500": this["Video-500"]})
    delete this['Video-500']
  }

  player(width, height) {
    let player = this["Video-500"]

    if (height) player = player.replace(/height="\d+"/, `height=${height}`)
    if (width)  player = player.replace(/width="\d+"/, `width=${width}`)

    return (
      <div className="TP-videoplayer"
           dangerouslySetInnerHTML={{__html: player}}>
      </div>
    )
  }
}