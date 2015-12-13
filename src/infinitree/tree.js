'use strict';

import Branch from './branch';
import Splitter from './splitter';

class Tree {
  constructor(game) {
    this.game = game;

    this.branches = [];

    this.addBranch(320, 480);

    this.yOffset = 0;

    this.splitters = [];

    this.growthInterval = 15;

    this.lastSplitter = 0;

    this.leftDown = false;
    this.rightDown = false;

    this.xSpeed = 0;
    this.yOffset = this.branches.filter(branch => branch.alive)[0].y - 240;

    this.alive = true;

    addEventListener('keydown', event => {
      if (event.which === 37) {
        this.leftDown = true;
      } else if (event.which === 39) {
        this.rightDown = true;
      }
    });

    addEventListener('keyup', event => {
      if (event.which === 37) {
        this.leftDown = false;
      } else if (event.which === 39) {
        this.rightDown = false;
      }
    });
  }

  update(deltaTime) {
    if (this.branches.filter(branch => branch.alive).length === 0) {
      this.alive = false;
    }

    if (this.alive) {
      if (this.leftDown) {
        this.xSpeed -= 0.001 * deltaTime;
        if (this.xSpeed < -0.3) {
          this.xSpeed = -0.3;
        }
      }

      if (this.rightDown) {
        this.xSpeed += 0.001 * deltaTime;
        if (this.xSpeed > 0.3) {
          this.xSpeed = 0.3;
        }
      }

      for (let branch of this.branches) {
        branch.x += this.xSpeed * deltaTime;
      }

      for (let branch of this.branches) {
        branch.update(deltaTime);
      }

      if (this.branches.filter(branch => branch.alive).length === 0) {
        this.alive = false;
        return;
      }

      this.yOffset = this.branches.filter(branch => branch.alive)[0].y - 240;

      this.lastSplitter += deltaTime;

      if (this.lastSplitter >= 1000) {
        if (Math.random() > 0.7) {
          this.splitters.push(new Splitter(this, 640 * Math.random() % 640, this.yOffset - 300));
        }
        this.lastSplitter = 0;
      }

      for (let splitter of this.splitters) {
        splitter.update(deltaTime);
      }

      this.game.score += deltaTime / 10;
      this.game.score = Math.floor(this.game.score);
    }
  }

  draw(context, xOffset, yOffset) {
    for (let splitter of this.splitters) {
      splitter.draw(context, xOffset, yOffset);
    }

    for (let branch of this.branches) {
      branch.draw(context, xOffset, yOffset);
    }
  }

  addBranch(x, y) {
    this.branches.push(new Branch(this, x, y));
  }

  splitBranch(branch) {
    let newBranch = new Branch(this, branch.x, branch.y);

    newBranch.sectionTimer = branch.sectionTimer;
    newBranch.addSection(newBranch.x, newBranch.y, newBranch.x, newBranch.y);

    branch.targetX = 1 + Math.round(8 * Math.random() % 8);
    newBranch.targetX = -1 - Math.round(8 * Math.random() % 8);

    this.branches.push(newBranch);
  }
}

export default Tree;
