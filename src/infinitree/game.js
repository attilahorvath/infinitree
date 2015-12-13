'use strict';

import Sky from './sky';
import Tree from './tree';
import Particle from './particle';

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.sky = new Sky(this);
    this.tree = new Tree(this);

    this.particles = [];

    this.score = 0;

    this.xOffset = 0;
    this.yOffset = 0;

    this.shakeTimer = 0;

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

    this.yOffset = this.tree.yOffset;

    for (let particle of this.particles) {
      particle.update(deltaTime);
    }

    if (this.shakeTimer > 0) {
      this.shakeTimer -= deltaTime;
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.translate(0, 0);

    let xOffset = this.xOffset;
    let yOffset = this.yOffset;

    if (this.shakeTimer > 0) {
      xOffset += -5 + Math.round(10 * Math.random() % 10);
      yOffset += -5 + Math.round(10 * Math.random() % 10);
    }

    this.sky.draw(this.context);
    this.tree.draw(this.context, xOffset, yOffset);

    for (let particle of this.particles) {
      particle.draw(this.context, xOffset, yOffset);
    }

    this.context.font = '24px monospace';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'black';
    this.context.fillText(`Score: ${this.score}`, 10, 10);

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  shake(interval) {
    this.shakeTimer += interval;
  }

  emitParticles(x, y, type, count) {
    for (let i = 0; i < count; i++) {
      let xSpeed = (Math.random() > 0.5 ? 1 : -1) * (0.1 + (Math.random() * 0.4));
      let ySpeed = (Math.random() > 0.5 ? 1 : -1) * (0.1 + (Math.random() * 0.4));
      this.addParticle(x, y, xSpeed, ySpeed, type);
    }
  }

  addParticle(x, y, xSpeed, ySpeed, type) {
    if (this.particles.length < 100) {
      this.particles.push(new Particle(x, y, xSpeed, ySpeed, type));
    } else {
      for (let p = 0; p < this.particles.length - 1; p++) {
        this.particles[p].x = this.particles[p + 1].x;
        this.particles[p].y = this.particles[p + 1].y;
        this.particles[p].xSpeed = this.particles[p + 1].xSpeed;
        this.particles[p].ySpeed = this.particles[p + 1].ySpeed;
        this.particles[p].type = this.particles[p + 1].type;
      }

      this.particles[this.particles.length - 1].x = x;
      this.particles[this.particles.length - 1].y = y;
      this.particles[this.particles.length - 1].xSpeed = xSpeed;
      this.particles[this.particles.length - 1].ySpeed = ySpeed;
      this.particles[this.particles.length - 1].type = type;
    }
  }
}

export default Game;
