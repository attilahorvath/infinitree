'use strict';

class GameOver {
  constructor(game) {
    this.game = game;

    this.over = false;
    this.timer = 0;

    addEventListener('keydown', event => {
      if (event.which === 37 || event.which === 39) {
        if (this.over && this.timer >= 1000) {
          this.game.start();
          this.over = false;
        }
      }
    });
  }

  update(deltaTime) {
    if (this.over) {
      this.timer += deltaTime;
    }
  }

  draw(context) {
    context.textBaseline = 'top';

    context.fillStyle = 'rgb(82, 42, 14)';
    context.font = '60px monospace';
    context.fillText('Game Over', 160, 30);

    context.fillStyle = 'rgb(154, 148, 78)';
    context.font = '20px monospace';
    context.fillText(`You scored ${this.game.score.toString()} points.`, 10, 150);
    context.fillText('Press [left] or [right] to try again.', 10, 180);
  }
}

export default GameOver;
