'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();

router.use('/auth', _auth2.default);
router.use('/products', _products2.default);
router.use('/users', _users2.default);

exports.default = router;