'use strict';

let sounds = new Map();

let playSound = path => {
  let sound = sounds.get(path);

  if (sound) {
    sound.play();
  } else {
    sound = new Audio(path);
    sound.play();
  }
};

export default playSound;
