'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sky = (function () {
  function Sky(game) {
    _classCallCheck(this, Sky);

    this.game = game;

    this.hue = 240;
    this.saturation = 100;
    this.lightness = 50;

    this.hueDirection = -1;
    this.saturationDirection = -1;
    this.lightnessDirection = 1;

    this.clouds = [];

    for (var i = 0; i < 3; i++) {
      this.addCloud(240 + Math.random() * 180);
    }

    this.cloudTimer = 400 + Math.random() * 3000;
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

      this.cloudTimer -= deltaTime;

      if (this.cloudTimer <= 0 && this.game.started) {
        this.addCloud(this.game.yOffset - 300);
        this.cloudTimer = 400 + Math.random() * 3000;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.clouds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cloud = _step.value;

          cloud.update(deltaTime);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      context.fillStyle = 'hsl(' + Math.round(this.hue) + ', ' + Math.round(this.saturation) + '%, ' + Math.round(this.lightness) + '%)';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.clouds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var cloud = _step2.value;

          cloud.draw(context, xOffset, yOffset);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'addCloud',
    value: function addCloud(y) {
      var x = Math.random() * 640;
      var xSpeed = -0.05 + Math.random() * 0.1;
      if (this.clouds.length < 10) {
        this.clouds.push(new _cloud2.default(x, y, xSpeed));
      } else {
        for (var c = 0; c < this.clouds.length - 1; c++) {
          this.clouds[c].x = this.clouds[c + 1].x;
          this.clouds[c].y = this.clouds[c + 1].y;
          this.clouds[c].xSpeed = this.clouds[c + 1].xSpeed;
        }
        this.clouds[this.clouds.length - 1].x = x;
        this.clouds[this.clouds.length - 1].y = y;
        this.clouds[this.clouds.length - 1].xSpeed = xSpeed;
      }
    }
  }]);

  return Sky;
})();

exports.default = Sky;