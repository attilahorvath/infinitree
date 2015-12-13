'use strict';

import getImage from './get_image';

class Cloud {
  constructor(x, y, xSpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
  }

  update(deltaTime) {
    this.x += this.xSpeed * deltaTime;
  }

  draw(context, xOffset, yOffset) {
    let image = getImage('images/cloud.png');
    if (image) {
      context.drawImage(image, this.x - xOffset, this.y - yOffset);
    } else {
      context.fillStyle = 'black';
      context.fillRect(this.x - xOffset, this.y - yOffset, 100, 50);
    }
  }
}

export default Cloud;
