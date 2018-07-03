const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  reviews: String
}, {strict: false});

export const Product = mongoose.model('Product', productSchema);