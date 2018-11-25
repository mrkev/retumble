//@flow
import React from "react";

import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type Raw = {
  Target: string,
  URL: string,
  Name: string,
  Description?: string,
} & PostRaw;

export type PostLink = {
  Target: string,
  URL: string,
  Name: string,
  Description?: string,
} & PostPost;

export function postLink(props: Raw): PostLink {
  const post = postFromProps(props);
  return {
    ...post,
    Target: props.Target,
    URL: props.URL,
    Name: props.Name,
    Description: props.Description,
  };
}
