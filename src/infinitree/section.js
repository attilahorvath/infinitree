'use strict';

import getImage from './get_image';

class Section {
  constructor(branch, x, y, angle) {
    this.branch = branch;

    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  update(deltaTime) {}

  draw(context, xOffset, yOffset, endSection) {
    context.translate(this.x - xOffset, this.y - yOffset);
    context.rotate(this.angle);

    let image = endSection ? getImage('images/end_section.png') : getImage('images/section.png');

    if (image) {
      context.drawImage(image, -5, -5);
    } else {
      context.fillRect(-5, -5, 10, 10);
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Section;
