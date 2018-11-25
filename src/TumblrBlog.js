// @flow
import { postQuote } from "./post/PostQuote";
import { postLink } from "./post/PostLink";
import { postChat } from "./post/PostChat";
import { postText } from "./post/PostText";
import { postAudio } from "./post/PostAudio";
import { postVideo } from "./post/PostVideo";
import { postPhoto } from "./post/PostPhoto";
import { pagination } from "./part/Pagination.jsx";

import type { PostQuote } from "./post/PostQuote";
import type { PostLink } from "./post/PostLink";
import type { PostChat } from "./post/PostChat";
import type { PostText } from "./post/PostText";
import type { PostAudio } from "./post/PostAudio";
import type { PostVideo } from "./post/PostVideo";
import type { PostPhoto } from "./post/PostPhoto";

////////////////////////////////////////////////////////////////////////// TYPES

type HTML = string;

export type Post =
  | PostQuote
  | PostLink
  | PostChat
  | PostText
  | PostAudio
  | PostVideo
  | PostPhoto;

export type BlogIdentity = {
  Title: string,
  Description?: HTML,
  PortraitURL: {
    "16": string,
    "24": string,
    "30": string,
    "40": string,
    "48": string,
    "64": string,
    "96": string,
    "128": string,
    "512": string,
  },
};

export type BlogContent = {
  Content: {
    Type: string,
    Posts: Array<string>,
    Pagination: Object,
  },
  Pages: Array<Object>,
};

export type Page = {
  URL: string,
  Label: string,
};

export type TumblrBlog = BlogIdentity & {
  Pages: Array<Page>,
};

///////////////////////////////////////////////////////////////////// EXTRACTORS

function getPages(props: Object): Array<Page> {
  const pages = Object.values(props.Pages);

  if (props.AskEnabled) {
    pages.push({
      URL: "/ask",
      Label: props.AskLabel,
    });
  }

  if (props.SubmissionsEnabled) {
    pages.push({
      URL: "/submit",
      Label: props.SubmitLabel,
    });
  }
  return pages;
}

function getIdentity(props: Object): BlogIdentity {
  return {
    Description: props.Description,
    Title: props.Title,
    PortraitURL: {
      "16": props["PortraitURL-16"],
      "24": props["PortraitURL-24"],
      "30": props["PortraitURL-30"],
      "40": props["PortraitURL-40"],
      "48": props["PortraitURL-48"],
      "64": props["PortraitURL-64"],
      "96": props["PortraitURL-96"],
      "128": props["PortraitURL-128"],
      "512": props["PortraitURL-512"],
    },
  };
}

function assignContent(blog: Object, props: Object): BlogContent {
  blog.Content = {};

  blog.Content.Type = props.IndexPage
    ? "index" // : perma && props.Pagination
    : // ? "post" // TODO
      "page";

  blog.Content.Posts = Object.values(props.Posts)
    .map(
      p =>
        p.PostType === "photo"
          ? postPhoto(p)
          : p.PostType === "video"
          ? postVideo(p)
          : p.PostType === "audio"
          ? postAudio(p)
          : p.PostType === "quote"
          ? postQuote(p)
          : p.PostType === "link"
          ? postLink(p)
          : p.PostType === "chat"
          ? postChat(p)
          : p.PostType === "text"
          ? postText(p)
          : null // Make another fallback post with just core props?
    )
    .map(p => {
      // index, page, post
      // p.Context = blog.PageType;
      return p;
    });
  return blog;
}

function assignPagination(blog: Object, props: Object) {
  if (props.IndexPage) {
    blog.Content.Pagination = pagination(props);
  } else if (props.PermalinkPage) {
    /** Content page **/
    if (props.PermalinkPagination) {
      // Pages don't have pagination
      blog.Content.Pagination = pagination(props.PermalinkPagination);
    }
  }
}

export default function tumblrBlog(props: Object, options: Object): TumblrBlog {
  const blog = {};
  const identity = getIdentity(props);
  const Pages = getPages(props);
  assignContent(blog, props);
  assignPagination(blog, props);
  return {
    ...blog,
    ...identity,
    Pages,
  };
}
