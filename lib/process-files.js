const {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderHTML,
  renderKeywords,
  sortUpdates
} = require("./processors");

const processFiles = options =>
  pipe(
    map(
      pipe(
        parseMarkdown,
        prefixMediaURLs(options.mediaPrefix),
        renderHTML,
        renderKeywords
      )
    ),
    sortUpdates
  );

module.exports = processFiles;
