const matter = require("gray-matter");
const md = require("markdown-it")();
const { compact, map, pipe, uniq } = require("./util");

const parseMarkdown = file =>
  file.startsWith("---") ? matter(file) : matter.read(file);

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

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const HREF_REGEX = /href="([^"]+)"/gm;
const extractLinks = update => {
  const links = (update.html.match(HREF_REGEX) || []).map(
    href => href.match(URL_REGEX)[0]
  );
  return {
    ...update,
    links
  };
};

const linkMentions = update => ({
  ...update,
  html: update.html.replace(
    /@(\w+)@twitter.com/,
    '<a href="https://twitter.com/$1">@$1@twitter.com</a>'
  )
});

module.exports = {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderKeywords,
  renderHTML,
  sortUpdates,
  extractLinks,
  linkMentions
};
