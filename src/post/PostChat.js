//@flow
import React from "react";
import lib from "../lib/obj.jsx";
import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type ChatLine = {
  Label: string,
  Name: string,
  Line: string,
  UserNumber: number,
};

export type Raw = {
  Title?: string,
  Lines: {
    [string]: {
      Label: string,
      Name: string,
      Line: string,
      UserNumber: string,
    },
  },
} & PostRaw;

export type PostChat = {
  Title?: string,
  Lines: {
    [string]: ChatLine,
  },
} & PostPost;

export function postChat(props: Raw): PostChat {
  const post = postFromProps(props);
  return {
    ...post,
    Title: props.Title,
    Lines: lib.obj2arr(props.Lines).map(line => ({
      Label: line.Label,
      Name: line.Name,
      Line: line.Line,
      UserNumber: parseInt(line.UserNumber),
    })),
  };
}
