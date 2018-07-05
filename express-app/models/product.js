const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  reviews: String
}, {strict: false, timestamps: {updatedAt: 'lastModifiedDate'}});

export const Product = mongoose.model('Product', productSchema);