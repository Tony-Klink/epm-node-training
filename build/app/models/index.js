'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _lokijs = require('lokijs');

var _lokijs2 = _interopRequireDefault(_lokijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = exports.db = new _lokijs2.default('db.json');