'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Title = (function () {
  function Title() {
    var _this = this;

    _classCallCheck(this, Title);

    this.started = false;

    addEventListener('keydown', function (event) {
      if (event.which === 37 || event.which === 39) {
        _this.started = true;
      }
    });

    this.alpha = 0;
  }

  _createClass(Title, [{
    key: 'update',
    value: function update(deltaTime) {
      if (this.alpha < 1) {
        this.alpha += 0.001 * deltaTime;
      } else {
        this.alpha = 1;
      }
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.textBaseline = 'top';

      context.fillStyle = 'rgba(82, 42, 14, ' + this.alpha + ')';
      context.font = '60px monospace';
      context.fillText('Infinitree', 150, 30);

      context.fillStyle = 'rgba(154, 148, 78, ' + this.alpha + ')';
      context.font = '20px monospace';
      context.fillText('Grow to infinity and beyond!', 160, 130);
      context.fillText('But watch out, there are all kinds of hazards', 60, 160);
      context.fillText('along the way.', 240, 190);

      context.fillStyle = 'rgba(200, 200, 200, ' + this.alpha + ')';
      context.font = '18px monospace';
      context.fillText('Control your growth by the [left] and [right] arrows.', 5, 270);
      context.fillText('Collect splitters to split your branches.', 5, 300);
      context.fillText('Avoid obstacles.', 5, 330);
      context.fillText('Press [left] or [right] to start.', 5, 360);
      context.fillText('Made by Attila Horvath for Ludum Dare 34.', 5, 450);
    }
  }]);

  return Title;
})();

exports.default = Title;