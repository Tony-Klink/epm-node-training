'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jwtVerify = require('../middlewares/jwtVerify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jsonParser = _bodyParser2.default.json();
const userRouter = (0, _express.Router)();

userRouter.use(jsonParser);
userRouter.use(_jwtVerify.jwtVerify);

userRouter.get('/', (req, res, next) => {
    const users = _user2.default.chain().find().data();
    if (users) {
        res.json(users);
    } else {
        res.status(404).send('Not Found');
    }
});
exports.default = userRouter;