const str = require("./string");
/** Delimits the blog object in a react theme. */
/** NOTE: Have to do this, else this definition conflicts with the
 * acutal delimiter on the javascript for the retumble themes. */
const DELIMITER = "/*b60572a8-ec4e-11e7-813f-f3216482b08a*/";
/** Identifies a react theme. All react themes should include this. */
const theme_identifier = "<!-- 6f011cda-9e1c-11e6-b4f7-531e647e5630 -->";
const isTheme = file => file && file.toString().indexOf(theme_identifier) > -1;

const t_objt_from_string = function(s) {
  var res;
  try {
    eval("res = " + s);
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const t_string_from_html = function(file) {
  if (!isTheme(file)) {
    return null;
  } else return str.between(file, DELIMITER, DELIMITER, { min: true });
};

const getPage = page => {
  const tumblrBlog = require("../TumblrBlog.js").default;
  return fetch(page)
    .then(response => response.text())
    .then(body => body && t_string_from_html(body))
    .then(ostr => ostr && t_objt_from_string(ostr))
    .then(json => json && tumblrBlog(json));
};

module.exports = {
  t_objt_from_string,
  t_string_from_html,
  isTheme,
  getPage,
};
