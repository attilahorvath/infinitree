'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cloud = (function () {
  function Cloud(x, y, xSpeed) {
    _classCallCheck(this, Cloud);

    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
  }

  _createClass(Cloud, [{
    key: 'update',
    value: function update(deltaTime) {
      this.x += this.xSpeed * deltaTime;
    }
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      var image = (0, _get_image2.default)('images/cloud.png');
      if (image) {
        context.drawImage(image, this.x - xOffset, this.y - yOffset);
      } else {
        context.fillStyle = 'black';
        context.fillRect(this.x - xOffset, this.y - yOffset, 100, 50);
      }
    }
  }]);

  return Cloud;
})();

exports.default = Cloud;