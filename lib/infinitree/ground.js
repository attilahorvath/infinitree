'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ground = (function () {
  function Ground() {
    _classCallCheck(this, Ground);
  }

  _createClass(Ground, [{
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      var topImage = (0, _get_image2.default)('images/ground_top.png');
      var image = (0, _get_image2.default)('images/ground.png');

      for (var x = 0; x <= 640; x += 50) {
        for (var y = 480; y <= 720; y += 50) {
          if (y === 480 && topImage) {
            context.drawImage(topImage, x - xOffset, y - yOffset);
          } else if (image) {
            context.drawImage(image, x - xOffset, y - yOffset);
          } else {
            context.fillStyle = 'black';
            context.fillRect(x - xOffset, y - yOffset, 50, 50);
          }
        }
      }
    }
  }]);

  return Ground;
})();

exports.default = Ground;