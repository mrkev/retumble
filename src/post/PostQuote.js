// @flow
import React from "react";
import lib from "../lib/obj.jsx";
import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type Raw = {
  Source?: HTML,
  Quote: string,
} & PostRaw;

export type PostQuote = {
  Length: "short" | "medium" | "long",
  Source?: HTML,
  Quote: string,
} & PostPost;

export function postQuote(props: Raw): PostQuote {
  const post = postFromProps(props);
  return {
    ...post,
    Length: "medium",
    Source: props.Source,
    Quote: props.Quote,
  };
}
