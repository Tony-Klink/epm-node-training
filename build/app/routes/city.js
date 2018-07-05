'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _validateCity = require('../middlewares/validateCity');

var _city = require('../models/city');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cityRouter = (0, _express.Router)();
const jsonParser = _bodyParser2.default.json();

cityRouter.use(jsonParser);
cityRouter.use(_validateCity.validateCity);

cityRouter.get('/', async (req, res, next) => {
    const cities = await _city.City.find();
    if (cities) {
        res.json(cities);
    } else {
        res.status(404).send('Not Found');
    }
});

cityRouter.get('/:id', async (req, res, next) => {
    const cities = await _city.City.findOne({ _id: req.params.id });
    if (cities) {
        res.json(cities);
    } else {
        res.status(404).send('Not Found');
    }
});

cityRouter.post('/', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    let city = new _city.City(Object.assign(req.body, { lastModifiedDate: new Date() }));
    city.save();
    res.status(200).send('OK');
});

cityRouter.put('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    _city.City.findByIdAndUpdate(req.params.id, Object.assign(req.body, { lastModifiedDate: new Date() })).then(() => {
        res.status(200).send('OK');
    }).catch(err => res.status(500).send('server error' + err));
});

cityRouter.delete('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    _city.City.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).send('OK');
    }).catch(err => res.status(500).send('server error' + err));
});

exports.default = cityRouter;