const test = require("tape");
const {
  renderHTML,
  prefixMediaURLs,
  renderKeywords,
  extractLinks
} = require("./processors");

test("renderKeywords", t => {
  const update = {
    content:
      "a HELLO and _Hello_ to t go the/whole **World** ![](/media/foo.jpg)"
  };
  const actual = renderKeywords(update).keywords;
  const expected = ["hello", "go", "whole", "world"];
  t.deepEqual(actual, expected, "generates keywords");
  t.end();
});

test("renderHTML", t => {
  const update = {
    content: "_Hello_ **World**"
  };
  const actual = renderHTML(update).html;
  const expected = "<p><em>Hello</em> <strong>World</strong></p>\n";

  t.same(actual, expected, "renders markdown");
  t.end();
});

test("prefixMediaURLs", t => {
  const update = {
    content:
      "Here's some images: ![foo](/media/foo.jpg) ![bar](/media/bar.jpg) ![](/media/hi.jpg)"
  };
  const actual = prefixMediaURLs("https://foo.com")(update).content;
  const expected =
    "Here's some images: ![foo](https://foo.com/media/foo.jpg) ![bar](https://foo.com/media/bar.jpg) ![](https://foo.com/media/hi.jpg)";
  t.same(actual, expected, "prefixes media image urls");
  t.end();
});

test("extractLinks", t => {
  const update = {
    html:
      'Here\'s a link <a href="https://foo.com/bar">Foo</a> <img src="https://foo.com/image.jpg"> <a href="http://bar.com/baz">Bar</a>'
  };
  const actual = extractLinks(update).links;
  const expected = ["https://foo.com/bar", "http://bar.com/baz"];
  t.same(actual, expected, "extracts links");
  t.end();
});
