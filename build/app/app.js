'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieMiddleware = require('./middlewares/cookieMiddleware');

var _queryMiddleware = require('./middlewares/queryMiddleware');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use(_cookieMiddleware.cookieParser);
app.use(_queryMiddleware.parseQuery);
app.use(_routes2.default);

exports.default = app;