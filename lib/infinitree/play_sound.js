'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sounds = new Map();

var playSound = function playSound(path) {
  var sound = sounds.get(path);

  if (sound) {
    sound.play();
  } else {
    sound = new Audio(path);
    sound.play();
  }
};

exports.default = playSound;