'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Splitter = (function () {
  function Splitter(tree, x, y) {
    _classCallCheck(this, Splitter);

    this.tree = tree;

    this.x = x;
    this.y = y;
    this.active = true;
  }

  _createClass(Splitter, [{
    key: 'update',
    value: function update(deltaTime) {
      if (this.active) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.tree.branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var branch = _step.value;

            var endSection = branch.sections[branch.sections.length - 1];
            if (Math.abs(endSection.x - this.x) <= 25 && Math.abs(endSection.y - this.y) <= 25) {
              this.tree.splitBranch(branch);
              this.active = false;
              this.tree.game.shake(400);
              this.tree.game.emitParticles(this.x, this.y, 'images/branch_particle.png', 25);
              return;
            }
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
    }
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      if (this.active) {
        context.translate(this.x + (this.side === 1 ? 10 : -10) - xOffset, this.y - yOffset);

        var image = (0, _get_image2.default)('images/splitter.png');

        if (image) {
          context.drawImage(image, -12, -12);
        } else {
          context.fillRect(-12, -12, 25, 25);
        }

        context.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  }]);

  return Splitter;
})();

exports.default = Splitter;