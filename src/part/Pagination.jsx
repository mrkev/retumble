// @flow
import React from "react";

type Props = {
  NextPage?: string,
  NextPost?: string,
  PreviousPage?: string,
  PreviousPost?: string,
  CurrentPage: string,
  TotalPages: string,
};

// NOTE: Pagination and permalink pagination are different topographies.
export type Pagination = {
  NextPage?: string,
  PreviousPage?: string,
  Next?: string,
  Previous?: string,
  CurrentPage: number,
  TotalPages: number,
};

export function pagination(props: Props): Pagination {
  return {
    // TODO: Remove and have two different types?
    // Remove more specific one and have just this type?
    Next: props.NextPost || props.NextPage,
    Previous: props.PreviousPost || props.PreviousPage,
    NextPage: props.NextPage,
    PreviousPage: props.PreviousPage,
    CurrentPage: parseInt(props.CurrentPage),
    TotalPages: parseInt(props.TotalPages),
  };
}
