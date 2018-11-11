import { postQuote } from "./post/PostQuote";
import { postLink } from "./post/PostLink";
import { postChat } from "./post/PostChat";
import { postText } from "./post/PostText";
import { postAudio } from "./post/PostAudio";
import { postVideo } from "./post/PostVideo";
import { postPhoto } from "./post/PostPhoto";
import { pagination } from "./part/Pagination.jsx";
import lib from "./lib/obj.jsx";

export type Page = {
  URL: string,
  Label: string,
};

// NOTE: Pagination and permalink pagination are different topographies.

export type Blog = {
  Content: {
    Type: string,
    Posts: Array<string>,
    Pagination: Object,
  },
  Pages: Array<Object>,
  PortraitURL: {
    "16": null,
    "24": null,
    "30": null,
    "40": null,
    "48": null,
    "64": null,
    "96": null,
    "128": string,
    "512": null,
  },
};

export type PostKind = Object;

export type RawProps = {
  AskEnabled: boolean,
  AskLabel: string,
  BlogURL: string,
  CopyrightYears: string,
  Description: string,
  Favicon: string,
  IndexPage: boolean,
  Pages: {
    [string]: Page,
  },
  Pagination?: {
    CurrentPage: string,
    NextPage: string,
    TotalPages: string,
  },
  Posts: {
    [string]: PostKind,
  },
  RSS: string,
  PermalinkPage?: mixed, // TODO
  PermalinkPagination?: mixed, // TODO
  SubmissionsEnabled: boolean,
  SubmitLabel: string,
  Title: string,
  CopyrightYears: string,
  "PortraitURL-128": string,
};

function assignPages(blog: Blog, props: RawProps) {
  // Ensures blog.Pages exists and is an Array
  blog.Pages = lib.obj2arr(props.Pages);

  if (props.AskEnabled) {
    blog.Pages.push({
      URL: "/ask",
      Label: props.AskLabel,
    });
  }

  if (props.SubmissionsEnabled) {
    blog.Pages.push({
      URL: "/submit",
      Label: props.SubmitLabel,
    });
  }
}

function assignIdentity(blog: Blog, props: RawProps) {
  blog.Description = props.Description;
  blog.Title = props.Title;

  blog.PortraitURL = {
    "16": null,
    "24": null,
    "30": null,
    "40": null,
    "48": null,
    "64": null,
    "96": null,
    "128": props["PortraitURL-128"],
    "512": null,
  };
}

// move this to utilities exposed to user
function isHomePage(blog: Blog) {
  return props.IndexPage && props.Pagination.CurrentPage === "1";
}

// move this to utilities exposed to user
// lib.html_insert(); // for use with blog.Description, for example

function assignContent(blog: Blog, props: RawProps) {
  blog.Content = {};

  blog.Content.Type = props.IndexPage
    ? "index" // : perma && props.Pagination
    : // ? "post" // TODO
      "page";

  blog.Content.Posts = lib
    .obj2arr(props.Posts)
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
}

function assignPagination(blog: Blog, props: RawProps) {
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

export default function tumblrBlog(props: RawProps, options: Object) {
  const blog = {};
  assignIdentity(blog, props);
  assignPages(blog, props);
  assignContent(blog, props);
  assignPagination(blog, props);
  return blog;
}
