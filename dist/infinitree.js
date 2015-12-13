(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./infinitree/game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default();
game.run();
},{"./infinitree/game":4}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _section = require('./section');

var _section2 = _interopRequireDefault(_section);

var _leaf = require('./leaf');

var _leaf2 = _interopRequireDefault(_leaf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Branch = (function () {
  function Branch(tree, x, y) {
    _classCallCheck(this, Branch);

    this.tree = tree;

    this.x = x;
    this.y = y;

    this.lastX = this.x;
    this.lastY = this.y + 10;

    this.targetX = 0;

    this.sections = [];
    this.leaves = [];

    this.sectionTimer = 0;
    this.lastLeaf = 0;

    this.alive = true;

    this.addSection(this.x, this.y, this.lastX, this.lastY);
  }

  _createClass(Branch, [{
    key: 'update',
    value: function update(deltaTime) {
      if (this.alive) {
        this.sectionTimer += deltaTime;

        if (this.sectionTimer >= this.tree.growthInterval) {
          if (this.targetX > 0) {
            this.x -= 5;
            this.targetX -= 0.5;
          } else if (this.targetX < 0) {
            this.x += 5;
            this.targetX += 0.5;
          }

          this.y -= 5;

          this.addSection(this.x, this.y, this.lastX, this.lastY);

          if (this.lastLeaf > 3 && Math.random() > 0.9) {
            this.addLeaf(this.x, this.y, this.lastX, this.lastY);
            this.lastLeaf = 0;
          } else {
            this.lastLeaf++;
          }

          this.lastX = this.x;
          this.lastY = this.y;

          this.sectionTimer -= this.tree.growthInterval;
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.sections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var section = _step.value;

            section.update(deltaTime);
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
      for (var i = 0; i < this.sections.length; i++) {
        this.sections[i].draw(context, xOffset, yOffset, i === this.sections.length - 1);
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.leaves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var leaf = _step2.value;

          leaf.draw(context, xOffset, yOffset);
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
    key: 'addSection',
    value: function addSection(x, y, lastX, lastY) {
      var angle = Math.atan2(lastY - this.y, lastX - this.x) - Math.PI / 2;

      if (this.sections.length < 100) {
        this.sections.push(new _section2.default(this, x, y, angle));
      } else {
        for (var i = 0; i < this.sections.length - 1; i++) {
          this.sections[i].x = this.sections[i + 1].x;
          this.sections[i].y = this.sections[i + 1].y;
          this.sections[i].angle = this.sections[i + 1].angle;
        }
        this.sections[this.sections.length - 1].x = x;
        this.sections[this.sections.length - 1].y = y;
        this.sections[this.sections.length - 1].angle = angle;
      }
    }
  }, {
    key: 'addLeaf',
    value: function addLeaf(x, y, lastX, lastY) {
      var angle = Math.atan2(lastY - this.y, lastX - this.x) - Math.PI / 2;
      var side = Math.random() > 0.5 ? 1 : 0;

      if (this.leaves.length < 25) {
        this.leaves.push(new _leaf2.default(this, x, y, angle, side));
      } else {
        for (var i = 0; i < this.leaves.length - 1; i++) {
          this.leaves[i].x = this.leaves[i + 1].x;
          this.leaves[i].y = this.leaves[i + 1].y;
          this.leaves[i].angle = this.leaves[i + 1].angle;
          this.leaves[i].side = this.leaves[i + 1].side;
        }
        this.leaves[this.leaves.length - 1].x = x;
        this.leaves[this.leaves.length - 1].y = y;
        this.leaves[this.leaves.length - 1].angle = angle;
        this.leaves[this.leaves.length - 1].side = side;
      }
    }
  }]);

  return Branch;
})();

exports.default = Branch;
},{"./leaf":7,"./section":10}],3:[function(require,module,exports){
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
},{"./get_image":5}],4:[function(require,module,exports){
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
},{"./ground":6,"./music":8,"./particle":9,"./sky":11,"./title":13,"./tree":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var images = new Map();

var getImage = function getImage(path) {
  var image = images.get(path);

  if (image) {
    return image.loaded ? image : null;
  } else {
    image = new Image();
    image.loaded = false;

    image.addEventListener('load', function () {
      image.loaded = true;
    });

    image.src = path;

    images.set(path, image);

    return getImage(path);
  }
};

exports.default = getImage;
},{}],6:[function(require,module,exports){
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
},{"./get_image":5}],7:[function(require,module,exports){
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
},{"./get_image":5}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Music = function Music() {
  _classCallCheck(this, Music);

  this.audio = new Audio('audio/infinitree.mp3');
  this.audio.loop = true;
  this.audio.play();
};

exports.default = Music;
},{}],9:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = (function () {
  function Particle(x, y, xSpeed, ySpeed, type) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.type = type;
  }

  _createClass(Particle, [{
    key: 'update',
    value: function update(deltaTime) {
      this.x += this.xSpeed * deltaTime;
      this.y += this.ySpeed * deltaTime;
    }
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      var image = (0, _get_image2.default)(this.type);

      if (!image) {
        context.fillStyle = 'black';
        context.fillRect(this.x - xOffset, this.y - yOffset, 5, 5);
      } else {
        context.drawImage(image, this.x - xOffset, this.y - yOffset);
      }
    }
  }]);

  return Particle;
})();

exports.default = Particle;
},{"./get_image":5}],10:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_image = require('./get_image');

var _get_image2 = _interopRequireDefault(_get_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Section = (function () {
  function Section(branch, x, y, angle) {
    _classCallCheck(this, Section);

    this.branch = branch;

    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  _createClass(Section, [{
    key: 'update',
    value: function update(deltaTime) {}
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset, endSection) {
      context.translate(this.x - xOffset, this.y - yOffset);
      context.rotate(this.angle);

      var image = endSection ? (0, _get_image2.default)('images/end_section.png') : (0, _get_image2.default)('images/section.png');

      if (image) {
        context.drawImage(image, -5, -5);
      } else {
        context.fillRect(-5, -5, 10, 10);
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }]);

  return Section;
})();

exports.default = Section;
},{"./get_image":5}],11:[function(require,module,exports){
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
},{"./cloud":3}],12:[function(require,module,exports){
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
},{"./get_image":5}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _branch = require('./branch');

var _branch2 = _interopRequireDefault(_branch);

var _splitter = require('./splitter');

var _splitter2 = _interopRequireDefault(_splitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = (function () {
  function Tree(game) {
    var _this = this;

    _classCallCheck(this, Tree);

    this.game = game;

    this.branches = [];

    this.addBranch(320, 480);

    this.yOffset = 0;

    this.splitters = [];

    this.growthInterval = 15;

    this.lastSplitter = 0;

    this.leftDown = false;
    this.rightDown = false;

    this.xSpeed = 0;
    this.yOffset = this.branches[0].y - 240;

    addEventListener('keydown', function (event) {
      if (event.which === 37) {
        _this.leftDown = true;
      } else if (event.which === 39) {
        _this.rightDown = true;
      }
    });

    addEventListener('keyup', function (event) {
      if (event.which === 37) {
        _this.leftDown = false;
      } else if (event.which === 39) {
        _this.rightDown = false;
      }
    });
  }

  _createClass(Tree, [{
    key: 'update',
    value: function update(deltaTime) {
      if (this.leftDown) {
        this.xSpeed -= 0.001 * deltaTime;
        if (this.xSpeed < -0.3) {
          this.xSpeed = -0.3;
        }
      }

      if (this.rightDown) {
        this.xSpeed += 0.001 * deltaTime;
        if (this.xSpeed > 0.3) {
          this.xSpeed = 0.3;
        }
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var branch = _step.value;

          branch.x += this.xSpeed * deltaTime;
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.branches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var branch = _step2.value;

          branch.update(deltaTime);
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

      this.yOffset = this.branches[0].y - 240;

      this.lastSplitter += deltaTime;

      if (this.lastSplitter >= 1000) {
        if (Math.random() > 0.8) {
          this.splitters.push(new _splitter2.default(this, 640 * Math.random() % 640, this.yOffset - 300));
        }
        this.lastSplitter = 0;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.splitters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var splitter = _step3.value;

          splitter.update(deltaTime);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this.game.score += deltaTime / 10;
      this.game.score = Math.floor(this.game.score);
    }
  }, {
    key: 'draw',
    value: function draw(context, xOffset, yOffset) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.splitters[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var splitter = _step4.value;

          splitter.draw(context, xOffset, yOffset);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.branches[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var branch = _step5.value;

          branch.draw(context, xOffset, yOffset);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: 'addBranch',
    value: function addBranch(x, y) {
      this.branches.push(new _branch2.default(this, x, y));
    }
  }, {
    key: 'splitBranch',
    value: function splitBranch(branch) {
      var newBranch = new _branch2.default(this, branch.x, branch.y);

      newBranch.sectionTimer = branch.sectionTimer;
      newBranch.addSection(newBranch.x, newBranch.y, newBranch.x, newBranch.y);

      branch.targetX = 1 + Math.round(8 * Math.random() % 8);
      newBranch.targetX = -1 - Math.round(8 * Math.random() % 8);

      this.branches.push(newBranch);
    }
  }]);

  return Tree;
})();

exports.default = Tree;
},{"./branch":2,"./splitter":12}]},{},[1]);
