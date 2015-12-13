'use strict';

import getImage from './get_image';

class Ground {
  constructor() {}

  draw(context, xOffset, yOffset) {
    let topImage = getImage('images/ground_top.png');
    let image = getImage('images/ground.png');

    for (let x = 0; x <= 640; x += 50) {
      for (let y = 480; y <= 720; y += 50) {
        if (y === 480 && topImage) {
          context.drawImage(topImage, x - xOffset, y - yOffset);
        } else if (image) {
          context.drawImage(image, x - xOffset, y - yOffset);
        } else {
          context.fillStyle = 'black';
          context.fillRect(x - xOffset, y - yOffset, 50, 50);
        }
      }
    }
  }
}

export default Ground;
