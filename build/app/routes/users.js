'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _user = require('../models/user');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jwtVerify = require('../middlewares/jwtVerify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jsonParser = _bodyParser2.default.json();
const userRouter = (0, _express.Router)();

userRouter.use(jsonParser);
userRouter.use(_jwtVerify.jwtVerify);

userRouter.get('/', async (req, res, next) => {
    const users = await _user.User.findAll();
    if (users) {
        res.json(users);
    } else {
        res.status(404).send('Not Found');
    }
});
exports.default = userRouter;