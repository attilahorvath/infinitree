'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sky = require('./sky');

var _sky2 = _interopRequireDefault(_sky);

var _title = require('./title');

var _title2 = _interopRequireDefault(_title);

var _ground = require('./ground');

var _ground2 = _interopRequireDefault(_ground);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var _music = require('./music');

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');

    this.title = new _title2.default();
    this.ground = new _ground2.default();

    this.started = false;

    this.sky = new _sky2.default(this);
    this.tree = new _tree2.default(this);

    this.particles = [];

    this.score = 0;

    this.xOffset = 0;
    this.yOffset = 0;

    this.shakeTimer = 0;

    this.music = new _music2.default();

    this.lastTime = performance.now();
  }

  _createClass(Game, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var currentTime = performance.now();
      var deltaTime = currentTime - this.lastTime;

      this.update(deltaTime);
      this.draw();

      this.lastTime = currentTime;

      requestAnimationFrame(function () {
        return _this.run();
      });
    }
  }, {
    key: 'update',
    value: function update(deltaTime) {
      this.sky.update(deltaTime);

      if (this.started) {
        this.tree.update(deltaTime);
      }

      this.yOffset = this.tree.yOffset;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var particle = _step.value;

          particle.update(deltaTime);
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

      if (this.shakeTimer > 0) {
        this.shakeTimer -= deltaTime;
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.translate(0, 0);

      var xOffset = this.xOffset;
      var yOffset = this.yOffset;

      if (this.shakeTimer > 0) {
        xOffset += -5 + Math.round(10 * Math.random() % 10);
        yOffset += -5 + Math.round(10 * Math.random() % 10);
      }

      this.sky.draw(this.context, xOffset, yOffset);
      this.ground.draw(this.context, xOffset, yOffset);
      this.tree.draw(this.context, xOffset, yOffset);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.particles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var particle = _step2.value;

          particle.draw(this.context, xOffset, yOffset);
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

      this.context.font = '24px monospace';
      this.context.textBaseline = 'top';
      this.context.fillStyle = 'black';
      this.context.fillText('Score: ' + this.score, 10, 10);

      if (!this.started) {
        this.title.draw(this.context);
      }

      this.started = this.title.started;

      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }, {
    key: 'shake',
    value: function shake(interval) {
      this.shakeTimer += interval;
    }
  }, {
    key: 'emitParticles',
    value: function emitParticles(x, y, type, count) {
      for (var i = 0; i < count; i++) {
        var xSpeed = (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.4);
        var ySpeed = (Math.random() > 0.5 ? 1 : -1) * (0.1 + Math.random() * 0.4);
        this.addParticle(x, y, xSpeed, ySpeed, type);
      }
    }
  }, {
    key: 'addParticle',
    value: function addParticle(x, y, xSpeed, ySpeed, type) {
      if (this.particles.length < 100) {
        this.particles.push(new _particle2.default(x, y, xSpeed, ySpeed, type));
      } else {
        for (var p = 0; p < this.particles.length - 1; p++) {
          this.particles[p].x = this.particles[p + 1].x;
          this.particles[p].y = this.particles[p + 1].y;
          this.particles[p].xSpeed = this.particles[p + 1].xSpeed;
          this.particles[p].ySpeed = this.particles[p + 1].ySpeed;
          this.particles[p].type = this.particles[p + 1].type;
        }

        this.particles[this.particles.length - 1].x = x;
        this.particles[this.particles.length - 1].y = y;
        this.particles[this.particles.length - 1].xSpeed = xSpeed;
        this.particles[this.particles.length - 1].ySpeed = ySpeed;
        this.particles[this.particles.length - 1].type = type;
      }
    }
  }]);

  return Game;
})();

exports.default = Game;