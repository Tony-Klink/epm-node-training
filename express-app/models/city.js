const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
}, {strict: false});

export const City = mongoose.model('City', citySchema);