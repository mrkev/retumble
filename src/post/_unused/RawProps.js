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
    [string]: Object,
  },
  RSS: string,
  PermalinkPage?: mixed, // TODO
  PermalinkPagination?: mixed, // TODO
  SubmissionsEnabled: boolean,
  SubmitLabel: string,
  Title: string,
  CopyrightYears: string,
  "PortraitURL-16": string,
  "PortraitURL-24": string,
  "PortraitURL-30": string,
  "PortraitURL-40": string,
  "PortraitURL-48": string,
  "PortraitURL-64": string,
  "PortraitURL-96": string,
  "PortraitURL-128": string,
  "PortraitURL-512": string,
};
