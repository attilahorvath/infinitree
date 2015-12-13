'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sky = (function () {
  function Sky() {
    _classCallCheck(this, Sky);

    this.hue = 240;
    this.saturation = 100;
    this.lightness = 50;

    this.hueDirection = -1;
    this.saturationDirection = -1;
    this.lightnessDirection = 1;
  }

  _createClass(Sky, [{
    key: 'update',
    value: function update(deltaTime) {
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
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'hsl(' + Math.round(this.hue) + ', ' + Math.round(this.saturation) + '%, ' + Math.round(this.lightness) + '%)';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }]);

  return Sky;
})();

exports.default = Sky;