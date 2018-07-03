'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  reviews: String
}, { strict: false });

const Product = exports.Product = mongoose.model('Product', productSchema);