(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _game = require('./infinitree/game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game2.default();
game.run();
},{"./infinitree/game":3}],2:[function(require,module,exports){
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
    this.lastY = this.y;

    this.targetX = 0;

    this.sections = [];
    this.leaves = [];

    this.sectionTimer = 0;
    this.lastLeaf = 0;
  }

  _createClass(Branch, [{
    key: 'update',
    value: function update(deltaTime) {
      this.sectionTimer += deltaTime;

      while (this.sectionTimer >= this.tree.growthInterval) {
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

        this.sectionTimer = this.tree.growthInterval - this.sectionTimer;
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
  }, {
    key: 'draw',
    value: function draw(context, yOffset) {
      for (var i = 0; i < this.sections.length; i++) {
        this.sections[i].draw(context, yOffset, i === this.sections.length - 1);
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.leaves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var leaf = _step2.value;

          leaf.draw(context, yOffset);
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
},{"./leaf":5,"./section":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sky = require('./sky');

var _sky2 = _interopRequireDefault(_sky);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

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

    this.sky = new _sky2.default(this);
    this.tree = new _tree2.default(this);

    this.score = 0;

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
      this.tree.update(deltaTime);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.translate(0, 0);

      this.sky.draw(this.context);
      this.tree.draw(this.context);

      this.context.font = '24px monospace';
      this.context.textBaseline = 'top';
      this.context.fillStyle = 'black';
      this.context.fillText('Score: ' + this.score, 10, 10);

      this.context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }]);

  return Game;
})();

exports.default = Game;
},{"./sky":7,"./tree":9}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
    value: function draw(context, yOffset) {
      context.translate(this.x + (this.side === 1 ? 10 : -10), this.y - yOffset);
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
},{"./get_image":4}],6:[function(require,module,exports){
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
    value: function draw(context, yOffset, endSection) {
      context.translate(this.x, this.y - yOffset);
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
},{"./get_image":4}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sky = (function () {
  function Sky() {
    _classCallCheck(this, Sky);

    this.hue = 240;
    this.saturation = 100;
    this.lightness = 50;

    this.hueDirection = -1;
    this.saturationDirection = -1;
    this.lightnessDirection = 1;
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
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      context.fillStyle = 'hsl(' + Math.round(this.hue) + ', ' + Math.round(this.saturation) + '%, ' + Math.round(this.lightness) + '%)';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }]);

  return Sky;
})();

exports.default = Sky;
},{}],8:[function(require,module,exports){
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
    value: function draw(context, yOffset) {
      if (this.active) {
        context.translate(this.x + (this.side === 1 ? 10 : -10), this.y - yOffset);

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
},{"./get_image":4}],9:[function(require,module,exports){
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.branches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var branch = _step.value;

            branch.x -= 0.1 * deltaTime;
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

      if (this.rightDown) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.branches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var branch = _step2.value;

            branch.x += 0.1 * deltaTime;
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.branches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var branch = _step3.value;

          branch.update(deltaTime);
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

      this.yOffset = this.branches[0].y - 240;

      this.lastSplitter += deltaTime;

      if (this.lastSplitter >= 1000) {
        if (Math.random() > 0.8) {
          this.splitters.push(new _splitter2.default(this, 640 * Math.random() % 640, this.yOffset - 300));
        }
        this.lastSplitter = 0;
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.splitters[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var splitter = _step4.value;

          splitter.update(deltaTime);
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

      this.game.score += deltaTime / 10;
      this.game.score = Math.floor(this.game.score);
    }
  }, {
    key: 'draw',
    value: function draw(context) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.branches[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var branch = _step5.value;

          branch.draw(context, this.yOffset);
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

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.splitters[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var splitter = _step6.value;

          splitter.draw(context, this.yOffset);
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
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
},{"./branch":2,"./splitter":8}]},{},[1]);
