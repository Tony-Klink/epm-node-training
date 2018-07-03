'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, { strict: false });

const User = exports.User = mongoose.model('User', userSchema);