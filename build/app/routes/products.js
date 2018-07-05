'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jwtVerify = require('../middlewares/jwtVerify');

var _product = require('../models/product');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = (0, _express.Router)();
const jsonParser = _bodyParser2.default.json();

productRouter.use(jsonParser);
// productRouter.use(jwtVerify);

productRouter.get('/', async (req, res, next) => {
    const products = await _product.Product.find();
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Not Found');
    }
});

productRouter.get('/:id', async (req, res, next) => {
    const products = await _product.Product.findOne({ _id: req.params.id });
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Not Found');
    }
});

productRouter.get('/:id/reviews', async (req, res, next) => {
    const products = await _product.Product.findOne({ _id: req.params.id }).reviews;
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Not Found');
    }
});

productRouter.post('/', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    let product = new _product.Product(req.body);
    product.save({ safe: false }, (err, product) => {
        product.lastModifiedDate = new Date();
        console.log(product);
        if (err) {
            res.sendStatus(400);
        } else {
            res.status(200).send('OK');
        }
    });
});

productRouter.delete('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    _product.Product.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).send('OK');
    }).catch(err => res.status(500).send('server error' + err));
});

exports.default = productRouter;