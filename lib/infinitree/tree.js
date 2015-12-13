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