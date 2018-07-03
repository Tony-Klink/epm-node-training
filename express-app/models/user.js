const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}, {strict: false});

export const User = mongoose.model('User', userSchema);