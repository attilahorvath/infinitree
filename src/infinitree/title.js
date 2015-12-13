'use strict';

class Title {
  constructor() {
    this.started = false;

    addEventListener('keydown', event => {
      if (event.which === 37 || event.which === 39) {
        this.started = true;
      }
    });

    this.alpha = 0;
  }

  update(deltaTime) {
    if (this.alpha < 1) {
      this.alpha += 0.001 * deltaTime;
    } else {
      this.alpha = 1;
    }
  }

  draw(context) {
    context.textBaseline = 'top';

    context.fillStyle = `rgba(82, 42, 14, ${this.alpha})`;
    context.font = '60px monospace';
    context.fillText('Infinitree', 150, 30);

    context.fillStyle = `rgba(154, 148, 78, ${this.alpha})`;
    context.font = '20px monospace';
    context.fillText('Grow to infinity and beyond!', 160, 130);
    context.fillText('But watch out, there are all kinds of hazards', 60, 160);
    context.fillText('along the way.', 240, 190);

    context.fillStyle = `rgba(200, 200, 200, ${this.alpha})`;
    context.font = '18px monospace';
    context.fillText('Control your growth by the [left] and [right] arrows.', 5, 270);
    context.fillText('Collect splitters to split your branches.', 5, 300);
    context.fillText('Avoid obstacles.', 5, 330);
    context.fillText('Press [left] or [right] to start.', 5, 360);
    context.fillText('Made by Attila Horvath for Ludum Dare 34.', 5, 450);
  }
}

export default Title;
