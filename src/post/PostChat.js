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

export type RawChatLine = {
  Label: string,
  Name: string,
  Line: string,
  UserNumber: string,
};

export type Raw = {
  Title?: string,
  Lines: {
    [string]: RawChatLine,
  },
} & PostRaw;

export type PostChat = {
  Title?: string,
  Lines: Array<ChatLine>,
} & PostPost;

export function postChat(props: Raw): PostChat {
  const post = postFromProps(props);

  function chatLine(raw: RawChatLine): ChatLine {
    return {
      Label: raw.Label,
      Name: raw.Name,
      Line: raw.Line,
      UserNumber: parseInt(raw.UserNumber),
    };
  }

  return {
    ...post,
    Title: props.Title,
    Lines: lib.obj2arr(props.Lines).map(chatLine),
  };
}
