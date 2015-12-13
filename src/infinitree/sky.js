'use strict';

import Cloud from './cloud';

class Sky {
  constructor(game) {
    this.game = game;

    this.hue = 240;
    this.saturation = 100;
    this.lightness = 50;

    this.hueDirection = -1;
    this.saturationDirection = -1;
    this.lightnessDirection = 1;

    this.clouds = [];

    for (let i = 0; i < 3; i++) {
      this.addCloud(240 + Math.random() * 180);
    }

    this.cloudTimer = 400 + Math.random() * 3000;
  }

  update(deltaTime) {
    if (this.hueDirection > 0) {
      this.hue += Math.random() * 0.01 * deltaTime;
      if (this.hue > 260) {
        this.hue = 260;
        this.hueDirection = -1;
      }
    } else {
      this.hue -= Math.random() * 0.01 * deltaTime;
      if (this.hue < 180) {
        this.hue = 180;
        this.hueDirection = 1;
      }
    }

    if (this.saturationDirection > 0) {
      this.saturation += Math.random() * 0.005 * deltaTime;
      if (this.saturation > 100) {
        this.saturation = 100;
        this.saturationDirection = -1;
      }
    } else {
      this.saturation -= Math.random() * 0.005 * deltaTime;
      if (this.saturation < 50) {
        this.saturation = 50;
        this.saturationDirection = 1;
      }
    }

    if (this.lightnessDirection > 0) {
      this.lightness += Math.random() * 0.01 * deltaTime;
      if (this.lightness > 80) {
        this.lightness = 80;
        this.lightnessDirection = -1;
      }
    } else {
      this.lightness -= Math.random() * 0.01 * deltaTime;
      if (this.lightness < 50) {
        this.lightness = 50;
        this.lightnessDirection = 1;
      }
    }

    this.cloudTimer -= deltaTime;

    if (this.cloudTimer <= 0 && this.game.started) {
      this.addCloud(this.game.yOffset - 300);
      this.cloudTimer = 400 + Math.random() * 3000;
    }

    for (let cloud of this.clouds) {
      cloud.update(deltaTime);
    }
  }

  draw(context, xOffset, yOffset) {
    context.fillStyle = `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (let cloud of this.clouds) {
      cloud.draw(context, xOffset, yOffset);
    }
  }

  addCloud(y) {
    let x = Math.random() * 640;
    let xSpeed = -0.05 + Math.random() * 0.1;
    if (this.clouds.length < 10) {
      this.clouds.push(new Cloud(x, y, xSpeed));
    } else {
      for (let c = 0; c < this.clouds.length - 1; c++) {
        this.clouds[c].x = this.clouds[c + 1].x;
        this.clouds[c].y = this.clouds[c + 1].y;
        this.clouds[c].xSpeed = this.clouds[c + 1].xSpeed;
      }
      this.clouds[this.clouds.length - 1].x = x;
      this.clouds[this.clouds.length - 1].y = y;
      this.clouds[this.clouds.length - 1].xSpeed = xSpeed;
    }
  }
}

export default Sky;
