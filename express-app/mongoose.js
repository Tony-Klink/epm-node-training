const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/homework');

export const db = mongoose.connection;