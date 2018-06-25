'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize3 = require('../sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _sequelize3.sequelize.define('user', {
    name: {
        type: _sequelize2.default.STRING
    },
    email: {
        type: _sequelize2.default.STRING
    },
    password: {
        type: _sequelize2.default.STRING
    }
});

User.sync({ force: true }).then(() => {
    User.create({ name: 'John', email: 'test1@email.com', password: '1234' });
    User.create({ name: 'Doe', email: 'test2@email.com', password: 'zaqwsx' });
    User.create({ name: 'Jane', email: 'test3@email.com', password: 'zaq123' });
    return;
});

exports.default = User;