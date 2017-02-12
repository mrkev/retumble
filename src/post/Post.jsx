import lib from '../objlib.jsx'

export default class Post {
  constructor(props) {
    // Take all properites
    Object.keys(props).forEach(k => this[k] = props[k])

    // Notes are sometimes null or false (database can't
    // calculate them fast enough)
    try { this.NoteCount = parseInt(this.NoteCount) }
    catch (e) { this.NoteCount = false }
  }
}