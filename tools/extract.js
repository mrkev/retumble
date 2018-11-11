const cheerio = require("cheerio");
const fs = require("fs-extra");
const path = require("path");
const table2json = require("table2json");
const cheerioTableparser = require("cheerio-tableparser");

/**
 * Auto-generates JS object key:value pairs from tumblr theme documentation.
 * NOTE: this script is far from perfect. It's meant to be a starting point,
 * to be manually reviewed, etc.
 *
 * Usage: node tools/extract > props.txt
 */

const file = fs.readFileSync(path.join(__dirname, "/theme_docs.html"), {
  encoding: "utf8",
});

const $ = cheerio.load(file);
cheerioTableparser($);

let tagsResult = [];
$("table").map(function(i, elem) {
  // res is table[column][row]
  const res = $(this).parsetable();
  // Extract the info from the table
  const table = res
    .reduce((acc, row, i) => {
      if (i === 0) {
        row.forEach(function(key) {
          acc.push({ key, description: "" });
        });
        return acc;
      }
      if (i === 1) {
        row.forEach(function(description, i) {
          acc[i].description = description;
        });
        return acc;
      } else {
        console.log("complex table?");
        return acc;
      }
    }, [])
    .filter(({ key }) => key.indexOf("{") === 0);

  // We don't need the descriptions
  const alltags = table
    // get us the tags
    .map(({ key }) => key)
    .map(function(key) {
      const numberOfCurlyTokens = (key.match(/\{/g) || []).length;
      switch (numberOfCurlyTokens) {
        case 0:
          console.log(`not a tag: "${key}"`);
          return null;
        case 1:
          return processTag(key);
        case 2:
          return processBlock(key);
        case 3:
          return processBlockWithTag(key);
        default:
          console.log(`a key has ${numberOfCurlyTokens} tokens: "${key}"`);
          return null;
      }
    })
    .filter(Boolean);

  tagsResult = tagsResult.concat(alltags);

  // if (i === 3) {
  //   console.log(alltags);
  //   process.exit(0);
  // }
});

/**
 * For example:
 *
 * {BlogURL}
 *
 * As far as we know it's not an optional.
 */
function processTag(str) {
  const res = str.match(/\{(.*?)\}/);

  if (res.length > 2) {
    console.log(`Found more tag names than expected: "${str}"`);
  }

  return {
    name: `"${res[1]}"`,
    value: `{JS${res[1]}}`,
  };
}

/**
 * For example:
 *
 * {block:IndexPage}
 * {/block:IndexPage}
 *
 * As far as we know there isn't a boolean for it, so we
 * we make our own.
 */
function processBlock(str) {
  str = str.replace(/\r?\n|\r|\<br ?\/?\>/g, "");
  const res = str.match(/\{block:(.*?)\}.*\{\/block:(.*?)\}/);

  // take the closing string as guard to avoid blocks with args

  if (res.length > 3) {
    console.log(`Found more tag names than expected: "${str}"`);
  }

  return {
    name: `"${res[2]}"`,
    value: "true",
    guardedBy: res[2],
  };
}

/**
 * For example:
 *
 * {block:PostTitle}
 *   {PostTitle}
 * {/block:PostTitle}
 *
 * We care about the center tag, and make it an optional.
 */
function processBlockWithTag(str) {
  str = str.replace(/\r?\n|\r|\<br ?\/?\>/g, "");
  const res = str.match(/\{block:(.*?)\}.*{(.*?)\}.*\{\/block:(.*?)\}/s);

  // take the closing string as guard to avoid blocks with args

  if (res.length > 4) {
    console.log(`Found more tag names than expected: "${str}"`);
  }
  return {
    name: `"${res[2]}"`,
    value: `{JS${res[2]}}`,
    guardedBy: res[1],
  };
}

///////////////////////////////////////////// stringifying

/**
 * name: string, // ready
 * value: string, // ready
 * guardedBy?: string // not in brackets
 */

const strings = tagsResult.map(tag => {
  const { name, value } = tag;
  if (tag.guardedBy) {
    const guard = tag.guardedBy;
    return `{block:${guard}} ${name}: ${value}, {/block:${guard}}`;
  } else {
    return `${name}: ${value},`;
  }
});

const final = strings.join("\n");

console.log(final);
process.exit(0);
