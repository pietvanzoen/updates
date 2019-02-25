const {
  parseMarkdown,
  prefixMediaURLs,
  renderHTML,
  extractLinks,
  linkMentions,
  populateLinkData
} = require("./processors");

const { map, pipe, sort, reverse } = require("./util");

const processFiles = options =>
  pipe(
    map(
      pipe(
        parseMarkdown,
        prefixMediaURLs(options.mediaPrefix),
        renderHTML,
        extractLinks,
        linkMentions,
        populateLinkData
      )
    ),
    sort((a, b) => new Date(a.data.date) - new Date(b.data.date)),
    reverse
  );

module.exports = processFiles;
