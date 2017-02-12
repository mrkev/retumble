import React from 'react'
import Post from './Post.jsx'
import lib from '../objlib.jsx'

export default class PostChat extends Post {
  constructor(props) {
    super(props)
    this.Lines = lib.obj2arr(this.Lines)
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