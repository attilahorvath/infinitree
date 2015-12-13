'use strict';

import Section from './section';
import Leaf from './leaf';

class Branch {
  constructor(tree, x, y) {
    this.tree = tree;

    this.x = x;
    this.y = y;

    this.lastX = this.x;
    this.lastY = this.y;

    this.targetX = 0;

    this.sections = [];
    this.leaves = [];

    this.sectionTimer = 0;
    this.lastLeaf = 0;

    this.alive = true;
  }

  update(deltaTime) {
    if (this.alive) {
      this.sectionTimer += deltaTime;

      if (this.sectionTimer >= this.tree.growthInterval) {
        if (this.targetX > 0) {
          this.x -= 5;
          this.targetX -= 0.5;
        } else if (this.targetX < 0) {
          this.x += 5;
          this.targetX += 0.5;
        }

        this.y -= 5;

        this.addSection(this.x, this.y, this.lastX, this.lastY);

        if (this.lastLeaf > 3 && Math.random() > 0.9) {
          this.addLeaf(this.x, this.y, this.lastX, this.lastY);
          this.lastLeaf = 0;
        } else {
          this.lastLeaf++;
        }

        this.lastX = this.x;
        this.lastY = this.y;

        this.sectionTimer -= this.tree.growthInterval;
      }

      for (let section of this.sections) {
        section.update(deltaTime);
      }
    }
  }

  draw(context, xOffset, yOffset) {
    for (let i = 0; i < this.sections.length; i++) {
      this.sections[i].draw(context, xOffset, yOffset, i === this.sections.length - 1);
    }

    for (let leaf of this.leaves) {
      leaf.draw(context, xOffset, yOffset);
    }
  }

  addSection(x, y, lastX, lastY) {
    let angle = Math.atan2(lastY - this.y, lastX - this.x) - Math.PI / 2;

    if (this.sections.length < 100) {
      this.sections.push(new Section(this, x, y, angle));
    } else {
      for (let i = 0; i < this.sections.length - 1; i++) {
        this.sections[i].x = this.sections[i + 1].x;
        this.sections[i].y = this.sections[i + 1].y;
        this.sections[i].angle = this.sections[i + 1].angle;
      }
      this.sections[this.sections.length - 1].x = x;
      this.sections[this.sections.length - 1].y = y;
      this.sections[this.sections.length - 1].angle = angle;
    }
  }

  addLeaf(x, y, lastX, lastY) {
    let angle = Math.atan2(lastY - this.y, lastX - this.x) - Math.PI / 2;
    let side = Math.random() > 0.5 ? 1 : 0;

    if (this.leaves.length < 25) {
      this.leaves.push(new Leaf(this, x, y, angle, side));
    } else {
      for (let i = 0; i < this.leaves.length - 1; i++) {
        this.leaves[i].x = this.leaves[i + 1].x;
        this.leaves[i].y = this.leaves[i + 1].y;
        this.leaves[i].angle = this.leaves[i + 1].angle;
        this.leaves[i].side = this.leaves[i + 1].side;
      }
      this.leaves[this.leaves.length - 1].x = x;
      this.leaves[this.leaves.length - 1].y = y;
      this.leaves[this.leaves.length - 1].angle = angle;
      this.leaves[this.leaves.length - 1].side = side;
    }
  }
}

export default Branch;
