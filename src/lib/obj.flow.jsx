// @flow
import React from "react";

function obj2arr<T>(obj: { [string]: T }): Array<T> {
  return Object.keys(obj || {}).map(k => obj[k]);
}

/**
 * Creates an html-insert function
 */
// type HTML = string;
// function htmlInsert(html: HTML) {
//   return props => {
//     if (!html) return null;
//     props = props || {};
//     return <div {...props} dangerouslySetInnerHTML={{ __html: html }} />;
//   };
// }

export default {
  obj2arr,
};
