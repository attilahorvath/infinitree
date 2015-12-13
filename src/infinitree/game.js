'use strict';

import Sky from './sky';
import Tree from './tree';

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.sky = new Sky(this);
    this.tree = new Tree(this);

    this.score = 0;

    this.lastTime = performance.now();
  }

  run() {
    let currentTime = performance.now();
    let deltaTime = currentTime - this.lastTime;

    this.update(deltaTime);
    this.draw();

    this.lastTime = currentTime;

    requestAnimationFrame(() => this.run());
  }

  update(deltaTime) {
    this.sky.update(deltaTime);
    this.tree.update(deltaTime);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(0, 0);

    this.sky.draw(this.context);
    this.tree.draw(this.context);

    this.context.font = '24px monospace';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'black';
    this.context.fillText(`Score: ${this.score}`, 10, 10);

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Game;
