'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Music = function Music() {
  _classCallCheck(this, Music);

  this.audio = new Audio('audio/infinitree.mp3');
  this.audio.loop = true;
  this.audio.play();
};

exports.default = Music;