'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _index = require('./index');

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let productCollection = _index.db.addCollection('product');

class Product {
    constructor(name, description, reviews) {
        this.id = (0, _v2.default)();
        this.name = name;
        this.description = description;
        this.reviews = reviews;
    }

}

productCollection.insert([new Product('product 1', 'sample product 1', [new _review2.default('very good product!'), new _review2.default('Nice!')]), new Product('product 2', 'sample product 2', [new _review2.default('not so good product')])]);

exports.default = productCollection;