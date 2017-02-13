import lib from '../objlib.jsx'

export default class Post {
  constructor(props) {
    // Take all properites
    Object.keys(props).forEach(k => this[k] = props[k])

    this.Tags = this.Tags && lib.obj2arr(this.Tags) || [];

    this.likebutton = lib.html_insert(this.LikeButton);
    this.reblogbutton = lib.html_insert(this.ReblogButton);
    delete this.LikeButton
    delete this.ReblogButton

    // Notes are sometimes null or false (database can't
    // calculate them fast enough)
    try { this.NoteCount = parseInt(this.NoteCount) }
    catch (e) { this.NoteCount = false }
  }
}
