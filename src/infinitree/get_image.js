'use strict';

let images = new Map();

let getImage = path => {
  let image = images.get(path);

  if (image) {
    return image.loaded ? image : null;
  } else {
    image = new Image();
    image.loaded = false;

    image.addEventListener('load', () => {
      image.loaded = true;
    });

    image.src = path;

    images.set(path, image);

    return getImage(path);
  }
};

export default getImage;
