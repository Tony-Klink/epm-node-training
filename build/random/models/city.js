'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
});

const City = exports.City = mongoose.model('City', citySchema);