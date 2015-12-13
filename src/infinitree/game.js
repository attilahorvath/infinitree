'use strict';

import Sky from './sky';
import Title from './title';
import Ground from './ground';
import Tree from './tree';
import Obstacle from './obstacle';
import Particle from './particle';
import Music from './music';
import GameOver from './game_over';
import preloadImages from './preload_images';

class Game {
  constructor() {
    preloadImages(['images/branch_particle.png', 'images/cloud.png', 'images/end_section.png', 'images/ground_top.png', 'images/ground.png', 'images/left_leaf.png', 'images/obstacle_particle.png', 'images/obstacle0.png', 'images/obstacle1.png', 'images/right_leaf.png', 'images/section.png', 'images/splitter.png']);

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.title = new Title();
    this.ground = new Ground();

    this.started = false;
    this.over = false;

    this.sky = new Sky(this);
    this.tree = new Tree(this);

    this.obstacles = [];
    this.particles = [];

    this.score = 0;

    this.xOffset = 0;
    this.yOffset = 0;

    this.obstacleTimer = 1500;
    this.shakeTimer = 0;

    this.music = new Music();

    this.gameOver = new GameOver(this);

    this.lastTime = performance.now();
  }

  start() {
    this.title = new Title();
    this.ground = new Ground();

    this.started = false;
    this.over = false;

    this.sky = new Sky(this);
    this.tree = new Tree(this);

    this.obstacles = [];
    this.particles = [];

    this.score = 0;

    this.xOffset = 0;
    this.yOffset = 0;

    this.obstacleTimer = 1500;
    this.shakeTimer = 0;

    this.gameOver = new GameOver(this);
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

    if (this.started) {
      this.tree.update(deltaTime);
    }

    this.yOffset = this.tree.yOffset;

    if (this.started) {
      this.obstacleTimer -= deltaTime;
    }

    if (this.obstacleTimer <= 0 && !this.over) {
      let multiple = Math.random() > 0.8;
      for (let i = 0; i < (multiple ? 2 : 1); i++) {
        let type = Math.floor(2 * Math.random() % 2);
        let x = Math.random() * 600;
        if (multiple) {
          x = i === 0 ? Math.random() * 250 : 350 + Math.random() * 250;
        }
        this.addObstacle(x, this.yOffset - 100, `images/obstacle${type}.png`);
      }
      this.obstacleTimer = 400 + Math.random() * 1000;
    }

    for (let obstacle of this.obstacles) {
      obstacle.update(deltaTime);
    }

    for (let particle of this.particles) {
      particle.update(deltaTime);
    }

    if (this.shakeTimer > 0) {
      this.shakeTimer -= deltaTime;
    }

    if (!this.started) {
      this.title.update(deltaTime);
    }

    if (!this.tree.alive) {
      this.gameOver.over = true;
    }

    if (this.over) {
      this.gameOver.update(deltaTime);
    }

    this.started = this.title.started;
    this.over = this.gameOver.over;
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

    this.sky.draw(this.context, xOffset, yOffset);
    this.ground.draw(this.context, xOffset, yOffset);
    this.tree.draw(this.context, xOffset, yOffset);

    for (let obstacle of this.obstacles) {
      obstacle.draw(this.context, xOffset, yOffset);
    }

    for (let particle of this.particles) {
      particle.draw(this.context, xOffset, yOffset);
    }

    if (!this.started) {
      this.title.draw(this.context);
    } else if (!this.over) {
      this.context.font = '24px monospace';
      this.context.textBaseline = 'top';
      this.context.fillStyle = 'black';
      this.context.fillText(`Score: ${this.score}`, 10, 10);
    } else {
      this.gameOver.draw(this.context);
    }

    this.context.setTransform(1, 0, 0, 1, 0, 0);
  }

  addObstacle(x, y, type) {
    if (this.obstacles.length < 20) {
      this.obstacles.push(new Obstacle(this, x, y, type));
    } else {
      for (let o = 0; o < this.obstacles.length - 1; o++) {
        this.obstacles[o].x = this.obstacles[o + 1].x;
        this.obstacles[o].y = this.obstacles[o + 1].y;
        this.obstacles[o].type = this.obstacles[o + 1].type;
      }
      this.obstacles[this.obstacles.length - 1].x = x;
      this.obstacles[this.obstacles.length - 1].y = y;
      this.obstacles[this.obstacles.length - 1].type = type;
    }
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
