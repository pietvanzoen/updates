const matter = require("gray-matter");
const md = require("markdown-it")();
const { compact, map, pipe, uniq } = require("./util");

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

const FILTER_WORDS = [
  "a",
  "an",
  "and",
  "but",
  "had",
  "has",
  "have",
  "i",
  "in",
  "is",
  "it",
  "no",
  "of",
  "the",
  "to",
  "we",
  "with",
  "yes",
  "for",
  "or",
  "at"
];
const renderKeywords = update => ({
  ...update,
  keywords: compact(
    uniq(
      update.content
        .replace("'", "")
        .replace(/!\[.*\]\(.*\)/, "") // remove links/images
        .split(/[\W_]/)
        .map(toLowerCase)
        .filter(w => !FILTER_WORDS.includes(w))
        .filter(w => w.length > 1)
    )
  )
});

const toLowerCase = str => str.toLowerCase();

module.exports = {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderKeywords,
  renderHTML,
  sortUpdates
};
