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

    addEventListener('keyup', function (event) {
      if (event.which === 37 || event.which === 39) {
        _this.started = true;
      }
    });
  }

  _createClass(Title, [{
    key: 'update',
    value: function update(deltaTime) {}
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillText('Infinitree', 100, 100);
    }
  }]);

  return Title;
})();

exports.default = Title;