const matter = require("gray-matter");
const md = require("markdown-it")();

const parseMarkdown = matter;

const renderHTML = update => ({
  ...update,
  html: md.render(update.content)
});

const prefixMediaURLs = prefix => ({ content, ...update }) => ({
  ...update,
  content: content.replace(/\]\(\/media/g, `](${prefix}/media`)
});

const sortUpdates = updates =>
  updates
    .sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
    .reverse();

const pipe = (...funcs) => data => funcs.reduce((acc, func) => func(acc), data);
const map = fn => arr => arr.map(fn);

module.exports = {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderHTML,
  sortUpdates
};
