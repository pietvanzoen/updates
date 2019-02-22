const test = require("tape");
const { renderHTML, prefixMediaURLs } = require("./processors");

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
