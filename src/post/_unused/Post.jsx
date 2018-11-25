import lib from "../../lib/obj.jsx";
import React from "react";

const insertHTML = (elem, src) => {
  //var script = document.createElement("script");
  //script.type = "text/javascript";
  //script.appendChild(document.createTextNode(src));
  // elem.appendChild(script);
  elem.innerHTML = src;
};

function insertScript(elem, src) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.appendChild(document.createTextNode(src));
  elem.appendChild(script);
}

function htmlInsert(html: HTML) {
  return props => {
    if (!html) return null;
    props = props || {};
    return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
  };
}

class LikeButton extends React.Component {
  componentDidMount() {
    const elem = document.getElementById(this.props.id);
    insertHTML(elem, this.props.src);
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

    this.Tags = (this.Tags && Object.values(this.Tags)) || [];
    this.likebutton = lib.htmlInsert(this.LikeButton);
    this.reblogbutton = lib.htmlInsert(this.ReblogButton);
    this.postNotes = lib.htmlInsert(this.PostNotes); // todo null on permalink?
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
