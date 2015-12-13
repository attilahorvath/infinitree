'use strict';

class Title {
  constructor() {
    this.started = false;

    addEventListener('keyup', event => {
      if (event.which === 37 || event.which === 39) {
        this.started = true;
      }
    });
  }

  update(deltaTime) {}

  draw(context) {
    context.fillText('Infinitree', 100, 100);
  }
}

export default Title;
