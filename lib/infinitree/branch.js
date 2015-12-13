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