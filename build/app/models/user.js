'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('../sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = exports.User = _sequelize3.sequelize.define('User', {
  name: _sequelize2.default.STRING,
  email: _sequelize2.default.STRING,
  password: _sequelize2.default.STRING
}, {});
User.associate = function (models) {
  // associations can be defined here
};