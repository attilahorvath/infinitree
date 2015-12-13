'use strict';

let preloadSounds = sounds => {
  for (let sound of sounds) {
    new Audio(sound);
  }
};

export default preloadSounds;
