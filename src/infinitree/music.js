'use strict';

class Music {
  constructor() {
    this.audio = new Audio('audio/infinitree.mp3');
    this.audio.loop = true;
    this.audio.play();
  }
}

export default Music;
