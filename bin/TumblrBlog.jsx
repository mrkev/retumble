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

class Post {
  constructor(props) {
    // Take all properites
    Object.keys(props).forEach(k => this[k] = props[k])

    // Notes are sometimes null or false (database can't
    // calculate them fast enough)
    try { this.NoteCount = parseInt(this.NoteCount) }
    catch (e) { this.NoteCount = false }
  }
}

class PostQuote extends Post {
  constructor (props) { super(props) }
}

class PostLink extends Post {
  constructor(props) {
    super(props)

    // Description -> body()
    this.body = html_insert(this.Description)
    delete this.Description

  }
}

class PostChat extends Post {
  constructor(props) {
    super(props)
    this.Lines = obj2arr(this.Lines)
    this.body = () => {
      return <ul className="chat">
        {this.Lines.map((line, i) => (
          <li className={"member" + line.UserNumber} key={i}>
            {!!line.Label && <span className="label">{line.Label}</span> }
            {line.Line}
          </li>)
        )}
      </ul>
    }
  }
}
class PostText extends Post {
  constructor(props) {
    super(props)
    // Body -> body()
    this.body = html_insert(this.Body)
    delete this.Body
  }
}

class PostAudio extends Post {
  constructor(props) {
    super(props)

    // Caption -> body()
    this.body = html_insert(this.Caption)
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

class PostVideo extends Post {
  constructor(props) {
    super(props)

    // Caption -> body()
    this.body = html_insert(this.Caption)
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

class PostPhoto extends Post {
  constructor(props) {
    super(props)

    // Caption -> body()
    this.body = html_insert(this.Caption)
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

export default class TumblrBlog {
  constructor(props) {
    Object.keys(props).forEach(k => this[k] = props[k])

    /** Posts **/

    this.Posts = obj2arr(this.Posts).map(p =>
      p.PostType === "photo" ? new PostPhoto(p) :
      p.PostType === "video" ? new PostVideo(p) :
      p.PostType === "audio" ? new PostAudio(p) :
      p.PostType === "quote" ? new PostQuote(p) :
      p.PostType === "link"  ? new PostLink(p)  :
      p.PostType === "chat"  ? new PostChat(p)  :
      p.PostType === "text"  ? new PostText(p)  :
      new Post(p))
    .map(p => {
      // TODO: Hack, remove, but useful?
      p.PermalinkPage = this.PermalinkPage
      return p
    })

    /** Pages + Ask + Submit **/

    this.Pages = obj2arr(this.Pages)

    if (this.AskEnabled) {
      this.Pages.push({
        URL: '/ask',
        Label: 'Ask', // TODO: AskLabel
      })
    }
    delete this.AskEnabled

    if (this.SubmissionsEnabled) {
      this.Pages.push({
        URL: '/submit',
        Label: this.SubmitLabel,
      })
    }
    delete this.SubmissionsEnabled
    delete this.SubmitLabel

    this.description = html_insert(this.Description)
    delete this.Description


    /** Pagination **/

    if (this.Pagination) {
      this.Pagination.CurrentPage = parseInt(this.Pagination.CurrentPage)
    }

    // Permalinks should only have one post
    if (this.PermalinkPage) {
      this.Post = this.Posts[0]
      delete this.Posts
    }

    this.HomePage = this.IndexPage && (!this.Pagination || this.Pagination.CurrentPage === 1) // todo; nicer. rework pagination
  }
}
