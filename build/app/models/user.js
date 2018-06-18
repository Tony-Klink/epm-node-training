'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('./index');

class User {
    constructor(name, email, verySecurePassword) {
        this.name = name;
        this.email = email;
        this.password = verySecurePassword;
    }
}

let userCollection = _index.db.addCollection('user');

userCollection.insert([new User('John', 'test1@email.com', '1234'), new User('Doe', 'test2@email.com', 'zaqwsx'), new User('Jane', 'test3@email.com', 'zaq123')]);

exports.default = userCollection;