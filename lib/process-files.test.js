const test = require("tape");
const processFiles = require("./process-files");

const FILE_1 = `---
date: 2019-02-15
---
This should be second.`;

const FILE_2 = `---
date: 2019-03-15
in_reply_to: foo
---
This should be first.
![](/media/foo.jpg)`;

const FILE_3 = `---
date: 2018-03-15
---
This should be third.`;

test("processFiles", t => {
  const MEDIA_PREFIX = "https://wibble.com";
  const updates = processFiles({ mediaPrefix: MEDIA_PREFIX })([
    FILE_1,
    FILE_2,
    FILE_3
  ]);

  t.ok(updates[0].content.includes("This should be first."), "date ordered");
  t.ok(updates[1].content.includes("This should be second."), "date ordered");
  t.ok(updates[2].content.includes("This should be third."), "date ordered");

  t.ok(updates[0].content.includes(MEDIA_PREFIX), "configures prefixing");

  t.ok(updates[0].html, "adds html");
  t.same(updates[0].data.date, new Date("2019-03-15"), "parses date");
  t.same(updates[0].data.in_reply_to, "foo", "parses other data");
  t.end();
});
