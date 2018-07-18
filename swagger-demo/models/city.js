const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
}, {strict: false, timestamps: {updatedAt: 'lastModifiedDate'}});

const City = exports.City = mongoose.model('City', citySchema);