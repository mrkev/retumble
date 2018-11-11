// @flow
import React from "react";
import lib from "../lib/obj.jsx";
import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type Raw = {
  Title?: string, // TODO: Make optional in index.html
  Body: string,
} & PostRaw;

export type PostText = {
  Title?: string, // TODO: Make optional in index.html
  Body: HTML,
} & PostPost;

export function postText(props: Raw): PostText {
  const post = postFromProps(props);
  return {
    ...post,
    Title: props.Title,
    Body: props.Body,
  };
}
