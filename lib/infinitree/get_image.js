'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var images = new Map();

var getImage = function getImage(path) {
  var image = images.get(path);

  if (image) {
    return image.loaded ? image : null;
  } else {
    image = new Image();
    image.loaded = false;

    image.addEventListener('load', function () {
      image.loaded = true;
    });

    image.src = path;

    images.set(path, image);

    return getImage(path);
  }
};

exports.default = getImage;