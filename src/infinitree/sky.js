'use strict';

class Sky {
  constructor() {
    this.hue = 240;
    this.saturation = 100;
    this.lightness = 50;

    this.hueDirection = -1;
    this.saturationDirection = -1;
    this.lightnessDirection = 1;
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
  }

  draw(context) {
    context.fillStyle = `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }
}

export default Sky;
