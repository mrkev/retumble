//@flow
import React from "react";
import lib from "../lib/obj.jsx";
import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type Raw = {
  "Video-500": string,
  Caption?: HTML,
} & PostRaw;

export type PostVideo = {
  Video: {
    "500": string,
  },
  Caption?: HTML,
} & PostPost;

export function postVideo(props: Raw): PostVideo {
  const post = postFromProps(props);
  return {
    ...post,
    Video: {
      "500": props["Video-500"],
    },
    Caption: props.Caption,
    // TODO: make helper function
    player(width, height) {
      let player = props["Video-500"];

      if (height) player = player.replace(/height="\d+"/, `height=${height}`);
      if (width) player = player.replace(/width="\d+"/, `width=${width}`);

      return (
        <div
          className="TP-videoplayer"
          dangerouslySetInnerHTML={{ __html: player }}
        />
      );
    },
  };
}
