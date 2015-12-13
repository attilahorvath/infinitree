'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Leaf = (function () {
  function Leaf(branch, x, y, angle, side) {
    _classCallCheck(this, Leaf);

    this.branch = branch;

    this.x = x;
    this.y = y;
    this.angle = angle;
    this.side = side;
  }

  _createClass(Leaf, [{
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      context.translate(this.x + (this.side === 1 ? 10 : -10) - xOffset, this.y - yOffset);
      context.rotate(this.angle);

      var image = this.side === 1 ? (0, _get_image2.default)('images/right_leaf.png') : (0, _get_image2.default)('images/left_leaf.png');

      if (image) {
        context.drawImage(image, -5, -5);
      } else {
        context.fillRect(-5, -5, 10, 10);
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }]);

  return Leaf;
})();

exports.default = Leaf;