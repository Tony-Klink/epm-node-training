const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homework');

const db = exports.db = mongoose.connection;