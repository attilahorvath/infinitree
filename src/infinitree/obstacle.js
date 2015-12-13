'use strict';

import getImage from './get_image';
import playSound from './play_sound';

class Obstacle {
  constructor(game, x, y, type) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.type = type;
  }

  update(deltaTime) {
    for (let branch of this.game.tree.branches) {
      if (branch.alive) {
        let endSection = branch.sections[branch.sections.length - 1];
        if (Math.abs(endSection.x - this.x) <= 50 && Math.abs(endSection.y - this.y) <= 50) {
          playSound('audio/hit.mp3');
          this.game.shake(400);
          this.game.emitParticles(this.x, this.y, 'images/obstacle_particle.png', 25);
          branch.alive = false;
        }
      }
    }
  }

  draw(context, xOffset, yOffset) {
    let image = getImage(this.type);
    if (!image) {
      context.fillStyle = 'black';
      context.fillRect(this.x - 50 - xOffset, this.y - 50 - yOffset, 100, 100);
    } else {
      context.drawImage(image, this.x - 50 - xOffset, this.y - 50 - yOffset);
    }
  }
}

export default Obstacle;
