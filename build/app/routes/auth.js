'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jsonParser = _bodyParser2.default.json();
const authRouter = (0, _express.Router)();

let errorResponse = responseData => ({
    code: 404,
    message: 'Not Found',
    data: responseData
});

let successResponse = (responseData, token) => ({
    code: 200,
    message: 'OK',
    data: { user: { username: responseData.name, email: responseData.email } },
    token: token
});

authRouter.post('/', jsonParser, (req, res) => {
    if (!req.body.login || !req.body.password && req.body.password.length === 0) return res.json(errorResponse('Wrong request')).status(404);

    const authUser = _user2.default.findOne({ name: req.body.login, password: req.body.password });

    if (!authUser) return res.json(errorResponse('Wrong login or password'));

    const token = _jsonwebtoken2.default.sign({ tokenSuccess: true }, 'SECRET_KEY');
    const responseObject = successResponse(authUser, token);

    res.json(responseObject);
});

exports.default = authRouter;