'use strict';

let preloadImages = images => {
  for (let image of images) {
    (new Image).src = image;
  }
};

export default preloadImages;
