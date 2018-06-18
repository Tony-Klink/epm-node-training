'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jwtVerify = require('../middlewares/jwtVerify');

var _product = require('../models/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = (0, _express.Router)();
const jsonParser = _bodyParser2.default.json();

productRouter.use(jsonParser);
productRouter.use(_jwtVerify.jwtVerify);

productRouter.get('/', (req, res, next) => {
    const products = _product2.default.chain().find().data();
    if (products) {
        res.json(products);
    } else {
        next();
    }
});

productRouter.get('/:id', (req, res, next) => {
    const products = _product2.default.findOne({ id: req.params.id });
    if (products) {
        res.json(products);
    } else {
        next();
    }
});

productRouter.get('/:id/reviews', (req, res, next) => {
    const products = _product2.default.findOne({ id: req.params.id }).reviews;
    if (products) {
        res.json(products);
    } else {
        next();
    }
});

productRouter.post('/', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    _product2.default.insert(req.body);
    res.sendStatus(200);
});

exports.default = productRouter;