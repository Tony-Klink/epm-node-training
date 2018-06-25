'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('../sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Product = _sequelize3.sequelize.define('product', {
    name: {
        type: _sequelize2.default.STRING
    },
    description: {
        type: _sequelize2.default.STRING
    },
    reviews: {
        type: _sequelize2.default.STRING
    }
});

Product.sync({ force: true }).then(() => {
    Product.create({ name: 'product 1', description: 'some product', reviews: 'good product' });
    Product.create({ name: 'product 2', description: 'another product', reviews: 'bad product' });
    return;
});

exports.default = Product;