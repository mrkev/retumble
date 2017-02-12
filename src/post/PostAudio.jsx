import React from 'react'
import Post from './Post.jsx'
import lib from '../objlib.jsx'

export default class PostAudio extends Post {
  constructor(props) {
    super(props)

    // Caption -> body()
    this.body = lib.html_insert(this.Caption)
    delete this.Caption

    // AudioPlayerGrey -> audioPlayer()
    this.audioPlayer = this.audioPlayer
        .bind({AudioPlayerGrey : this.AudioPlayerGrey})
    delete this.AudioPlayerGrey
  }

  audioPlayer(width, height) {
    width = width || 207
    height = height || 27
    const player = this["AudioPlayerGrey"]
      .replace(/height="\d+"/, `height=${height}`)
      .replace(/width="\d+"/, `width=${width}`)
    return (
      <div className="TP-audioplayer"
           dangerouslySetInnerHTML={{__html: player}}>
      </div>
    )
  }
}
