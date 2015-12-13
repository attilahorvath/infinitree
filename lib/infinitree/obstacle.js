'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

var _play_sound = require('./play_sound');

var _play_sound2 = _interopRequireDefault(_play_sound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = (function () {
  function Obstacle(game, x, y, type) {
    _classCallCheck(this, Obstacle);

    this.game = game;
    this.x = x;
    this.y = y;
    this.type = type;
  }

  _createClass(Obstacle, [{
    key: 'update',
    value: function update(deltaTime) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.game.tree.branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var branch = _step.value;

          if (branch.alive) {
            var endSection = branch.sections[branch.sections.length - 1];
            if (Math.abs(endSection.x - this.x) <= 50 && Math.abs(endSection.y - this.y) <= 50) {
              (0, _play_sound2.default)('audio/hit.mp3');
              this.game.shake(400);
              this.game.emitParticles(this.x, this.y, 'images/obstacle_particle.png', 25);
              branch.alive = false;
            }
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
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      var image = (0, _get_image2.default)(this.type);
      if (!image) {
        context.fillStyle = 'black';
        context.fillRect(this.x - 50 - xOffset, this.y - 50 - yOffset, 100, 100);
      } else {
        context.drawImage(image, this.x - 50 - xOffset, this.y - 50 - yOffset);
      }
    }
  }]);

  return Obstacle;
})();

exports.default = Obstacle;