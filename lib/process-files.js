const {
  map,
  parseMarkdown,
  pipe,
  prefixMediaURLs,
  renderHTML,
  sortUpdates
} = require("./processors");

const processFiles = options =>
  pipe(
    map(
      pipe(
        parseMarkdown,
        prefixMediaURLs(options.mediaPrefix),
        renderHTML
      )
    ),
    sortUpdates
  );

module.exports = processFiles;
