const filter = fn => arr => arr.filter(fn);
const compact = filter(Boolean);
const map = fn => arr => arr.map(fn);
const pipe = (...funcs) => data => funcs.reduce((acc, func) => func(acc), data);
const uniq = arr => [...new Set(arr)];

module.exports = {
  compact,
  filter,
  map,
  pipe,
  uniq
};
