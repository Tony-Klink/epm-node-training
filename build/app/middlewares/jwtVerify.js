'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jwtVerify = jwtVerify;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jwtVerify(req, res, next) {
    const decoded = _jsonwebtoken2.default.verify(req.body.token, 'SECRET_KEY');
    console.log('Token: ' + JSON.stringify(decoded));
    next();
}