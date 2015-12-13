'use strict';

import getImage from './get_image';

class Particle {
  constructor(x, y, xSpeed, ySpeed, type) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.type = type;
  }

  update(deltaTime) {
    this.x += this.xSpeed * deltaTime;
    this.y += this.ySpeed * deltaTime;
  }

  draw(context, xOffset, yOffset) {
    let image = getImage(this.type);

    if (!image) {
      context.fillStyle = 'black';
      context.fillRect(this.x - xOffset, this.y - yOffset, 5, 5);
    } else {
      context.drawImage(image, this.x - xOffset, this.y - yOffset);
    }
  }
}

export default Particle;
