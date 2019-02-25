const filter = fn => arr => arr.filter(fn);
const compact = filter(Boolean);
const map = fn => async arr => await Promise.all(arr.map(fn));
const pipe = (...funcs) => async data => {
  let result = data;
  for (let fn of funcs) {
    result = await fn(result);
  }
  return result;
};
const uniq = arr => [...new Set(arr)];

const sort = fn => arr => arr.sort(fn);
const reverse = arr => arr.reverse();

module.exports = {
  compact,
  filter,
  map,
  pipe,
  uniq,
  sort,
  reverse
};
