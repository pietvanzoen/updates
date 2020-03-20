var sizeOf = require("image-size");
const sharp = require("sharp");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const MAX_WIDTH = 1400;

function optimizeMedia(buffer) {
  return resize(buffer).then(compress);
}

function resize(buffer) {
  const { width } = sizeOf(buffer);
  if (width < MAX_WIDTH) return Promise.resolve(buffer);
  return sharp(buffer)
    .rotate()
    .resize(MAX_WIDTH)
    .toBuffer();
}

function compress(buffer) {
  return imagemin.buffer(buffer, {
    plugins: [imageminJpegtran(), imageminPngquant()]
  });
}

module.exports = optimizeMedia;
