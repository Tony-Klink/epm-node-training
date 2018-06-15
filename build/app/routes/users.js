'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = (0, _express.Router)();

userRouter.get('/', (req, res, next) => {
    const users = _user2.default.chain().find().data();
    if (users) {
        res.json(users);
    } else {
        next();
    }
});
exports.default = userRouter;