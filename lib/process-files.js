const {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderHTML,
  sortUpdates,
  extractLinks
} = require("./processors");

const processFiles = options =>
  pipe(
    map(
      pipe(
        parseMarkdown,
        prefixMediaURLs(options.mediaPrefix),
        renderHTML,
        extractLinks
      )
    ),
    sortUpdates
  );

module.exports = processFiles;
