const sharp = require("sharp");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const isGif = require('is-gif');

const MAX_WIDTH = 1400;

function optimizeMedia(buffer) {
  if (isGif(buffer)) return Promise.resolve(buffer);
  return resize(buffer).then(compress);
}

function resize(buffer) {
  return sharp(buffer)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .toBuffer();
}

function compress(buffer) {
  return imagemin.buffer(buffer, {
    plugins: [imageminJpegtran(), imageminPngquant()]
  });
}

module.exports = optimizeMedia;
