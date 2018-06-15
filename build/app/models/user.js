'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('./index');

class User {
    constructor(name) {
        this.name = name;
    }
}

let userCollection = _index.db.addCollection('user');

userCollection.insert([new User('John'), new User('Doe'), new User('Jane')]);

exports.default = userCollection;