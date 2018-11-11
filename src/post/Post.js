// @flow

import lib from "../lib/obj.jsx";

/**
 * The shared structure of all posts.
 */

export type HTML = string;

export type Tag = {
  Tag: string,
  TagURL: string,
  TagURLChrono: string,
  URLSafeTag: string,
};

export type PostRaw = {
  Permalink: string,
  PostID: string,
  PostNotesURL: string,
  PostType: string,
  ShortURL: string,
  Tags: Array<Tag>,
  TimeAgo: string,
  Timestamp: string,
  EmbedUrl: string,
  LikeButton: HTML,
  NoteCount: null | false | string,
  ReblogButton: HTML,
  Tags: { [string]: Tag },
};

export type PostPost = {
  Tags: Array<Tag>,
  PostNotesURL: string,
  LikeButton: HTML,
  ReblogButton: HTML,
  NoteCount: ?number,
  Timestamp: Date,
  PostType: string,
};

export function postFromProps(props: PostRaw): PostPost {
  const post = {};
  post.Tags = (props.Tags && lib.obj2arr(props.Tags)) || [];
  post.PostNotesURL = props.PostNotesURL; // todo null on permalink?
  post.LikeButton = props.LikeButton;
  post.ReblogButton = props.ReblogButton;
  post.Timestamp = new Date(parseInt(props.Timestamp) * 1000);
  post.PostType = props.PostType;
  // Notes are sometimes null or false (if database can't calculate them fast enough)
  post.NoteCount = null;
  if (typeof props.NoteCount === "string") {
    try {
      post.NoteCount = parseInt(props.NoteCount);
    } catch (e) {}
  }
  return post;
}
