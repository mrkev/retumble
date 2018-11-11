import lib from "../../lib/obj.jsx";
import React from "react";

class LikeButton extends React.Component {
  componentDidMount() {
    const elem = document.getElementById(this.props.id);
    lib.insertHTML(elem, this.props.src);
    console.log(this.props.src);
  }
  render() {
    return <div id={this.props.id} />;
  }
}

export default class Post {
  constructor(props) {
    // Take all properites
    Object.keys(props).forEach(k => (this[k] = props[k]));

    this.Tags = (this.Tags && lib.obj2arr(this.Tags)) || [];
    this.likebutton = lib.html_insert(this.LikeButton);
    this.reblogbutton = lib.html_insert(this.ReblogButton);
    this.postNotes = lib.html_insert(this.PostNotes); // todo null on permalink?
    // this.testlike = <LikeButton
    // 	id={"like-" + this.PostID}
    // 	src={this.LikeButton}></LikeButton>

    delete this.LikeButton;
    delete this.ReblogButton;
    delete this.PostNotes;
    // Notes are sometimes null or false (database can't
    // calculate them fast enough)
    try {
      this.NoteCount = parseInt(this.NoteCount);
    } catch (e) {
      this.NoteCount = false;
    }

    this.Timestamp = new Date(parseInt(this.Timestamp) * 1000);
  }
}

export function postPost(props) {
  return new PostPost(props);
}
