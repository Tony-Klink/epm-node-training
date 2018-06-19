'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieMiddleware = require('./middlewares/cookieMiddleware');

var _queryMiddleware = require('./middlewares/queryMiddleware');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use(_cookieMiddleware.cookieParser);
app.use(_queryMiddleware.parseQuery);
app.use(_routes2.default);
app.use(_expressSession2.default);
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

exports.default = app;