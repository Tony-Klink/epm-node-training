'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('../sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Product = exports.Product = _sequelize3.sequelize.define('Product', {
  name: _sequelize2.default.STRING,
  description: _sequelize2.default.STRING,
  reviews: _sequelize2.default.STRING
}, {});
Product.associate = function (models) {
  // associations can be defined here
};