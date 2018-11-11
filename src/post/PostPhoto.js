//@flow
import React from "react";
import lib from "../lib/obj.jsx";
import { postFromProps } from "./Post";

import type { HTML, Tag, PostRaw, PostPost } from "./Post";

export type Raw = {
  LinkURL?: string,
  LinkOpenTag?: string,
  LinkCloseTag?: string,
  PhotoAlt: string,
  "PhotoURL-500": string,
  "PhotoURL-HighRes"?: string,
  "PhotoWidth-HighRes"?: string,
  "PhotoHeight-HighRes"?: string,
  Caption?: string,
  // Werid
  "Video-500"?: string,
} & PostRaw;

export type Photo = {
  URL: string,
  Width: number,
  Height: number,
};

export type PostPhoto = {
  LinkURL?: string,
  Photo: {
    "500": Photo,
    HighRes?: Photo,
  },
  PhotoAlt: string,
  Caption?: HTML,
} & PostPost;

export function postPhoto(props: Raw): PostPhoto {
  const post = postFromProps(props);
  const postPhoto = {
    ...post,
    LinkURL: props.LinkURL,
    Photo: {},
    PhotoAlt: props.PhotoAlt,
    // TODO: make body() helper that automatically discerns caption/description,
    // etc for each post type ?
    Caption: props.Caption,

    // TODO: Make helper. Or check logic beforehand. Is this
    // video because of gifs?
    photos() {
      if (props["Video-500"]) {
        return (
          <div
            className="TP-videoplayer"
            dangerouslySetInnerHTML={{ __html: props["Video-500"] }}
          />
        );
      } else {
        return (
          <div
            className="pp-photo"
            dangerouslySetInnerHTML={{
              __html:
                "" +
                (props.LinkOpenTag || "") +
                "\n" +
                '<img src="' +
                props["PhotoURL-500"] +
                '" alt="' +
                props.PhotoAlt +
                '" />' +
                (props.LinkCloseTag || ""),
            }}
          />
        );
      }
    },
  };

  postPhoto.Photo["500"] = {
    URL: props["PhotoURL-500"],
    Width: 0, // TODO
    Height: 0, // TODO,
  };

  const URL = props["PhotoURL-HighRes"];
  const Width = props["PhotoWidth-HighRes"];
  const Height = props["PhotoHeight-HighRes"];
  if (URL && Width && Height) {
    postPhoto.Photo.HighRes = {
      URL,
      Width: parseInt(Width),
      Height: parseInt(Height),
    };
  }

  return postPhoto;
}
