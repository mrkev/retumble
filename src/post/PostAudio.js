//@flow
import React from "react";

import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type Raw = {
  AudioPlayerGrey: HTML,
  PlayCountWithLabel: string,
  Caption?: string,
  ExternalAudio?: string,
  Artist?: string,
  TrackName?: string,
} & PostRaw;

export type PostAudio = {
  AudioPlayerGrey: HTML,
  PlayCountWithLabel: string,
  Caption?: string,
  ExternalAudio?: string,
  Artist?: string,
  TrackName?: string,
} & PostPost;

export function postAudio(props: Raw): PostAudio {
  const post = postFromProps(props);

  return {
    ...post,
    AudioPlayerGrey: props.AudioPlayerGrey,
    PlayCountWithLabel: props.PlayCountWithLabel,
    Caption: props.Caption,
    ExternalAudio: props.ExternalAudio,
    Artist: props.Artist,
    TrackName: props.TrackName,
    // TODO: Make this an exported helper function
    audioPlayer(width, height) {
      width = width || 207;
      height = height || 27;
      const player = props["AudioPlayerGrey"]
        .replace(/height="\d+"/, `height=${height}`)
        .replace(/width="\d+"/, `width=${width}`);
      return (
        <div
          className="TP-audioplayer"
          dangerouslySetInnerHTML={{ __html: player }}
        />
      );
    },
  };
}
