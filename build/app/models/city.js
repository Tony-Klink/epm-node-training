'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
}, { strict: false });

const City = exports.City = mongoose.model('City', citySchema);