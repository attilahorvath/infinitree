'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameOver = (function () {
  function GameOver(game) {
    var _this = this;

    _classCallCheck(this, GameOver);

    this.game = game;

    this.over = false;
    this.timer = 0;

    addEventListener('keydown', function (event) {
      if (event.which === 37 || event.which === 39) {
        if (_this.over && _this.timer >= 1000) {
          _this.game.start();
          _this.over = false;
        }
      }
    });
  }

  _createClass(GameOver, [{
    key: 'update',
    value: function update(deltaTime) {
      if (this.over) {
        this.timer += deltaTime;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.textBaseline = 'top';

      context.fillStyle = 'rgb(82, 42, 14)';
      context.font = '60px monospace';
      context.fillText('Game Over', 160, 30);

      context.fillStyle = 'rgb(154, 148, 78)';
      context.font = '20px monospace';
      context.fillText('You scored ' + this.game.score.toString() + ' points.', 10, 150);
      context.fillText('Press [left] or [right] to try again.', 10, 180);
    }
  }]);

  return GameOver;
})();

exports.default = GameOver;