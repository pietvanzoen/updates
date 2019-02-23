const {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderHTML,
  sortUpdates,
  extractLinks,
  linkMentions
} = require("./processors");

const processFiles = options =>
  pipe(
    map(
      pipe(
        parseMarkdown,
        prefixMediaURLs(options.mediaPrefix),
        renderHTML,
        extractLinks,
        linkMentions
      )
    ),
    sortUpdates
  );

module.exports = processFiles;
