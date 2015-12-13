'use strict';

import getImage from './get_image';

class Leaf {
  constructor(branch, x, y, angle, side) {
    this.branch = branch;
    
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.side = side;
  }

  draw(context, yOffset) {
    context.translate(this.x + (this.side === 1 ? 10 : -10), this.y - yOffset);
    context.rotate(this.angle);

    let image = this.side === 1 ? getImage('images/right_leaf.png') : getImage('images/left_leaf.png');

    if (image) {
      context.drawImage(image, -5, -5);
    } else {
      context.fillRect(-5, -5, 10, 10);
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Leaf;
