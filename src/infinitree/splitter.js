'use strict';

import getImage from './get_image';

class Splitter {
  constructor(tree, x, y) {
    this.tree = tree;

    this.x = x;
    this.y = y;
    this.active = true;
  }

  update(deltaTime) {
    if (this.active) {
      for (let branch of this.tree.branches) {
        let endSection = branch.sections[branch.sections.length - 1];
        if (Math.abs(endSection.x - this.x) <= 25 && Math.abs(endSection.y - this.y) <= 25) {
          this.tree.splitBranch(branch);
          this.active = false;
          return;
        }
      }
    }
  }

  draw(context, yOffset) {
    if (this.active) {
      context.translate(this.x + (this.side === 1 ? 10 : -10), this.y - yOffset);

      let image = getImage('images/splitter.png');

      if (image) {
        context.drawImage(image, -12, -12);
      } else {
        context.fillRect(-12, -12, 25, 25);
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}

export default Splitter;
