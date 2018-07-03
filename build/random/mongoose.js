'use strict';

var _cities = require('./mock/cities.js');

var _city = require('./models/city');

const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/homework');
const db = mongoose.connection;

db.on('error', () => {
    console.log('Connection error');
});
db.on('open', () => {
    console.log('Successully connected');
    _city.City.insertMany(_cities.cities);
});

const app = express();

app.get('/', async (req, res) => {
    const resp = await _city.City.find();
    res.json(resp[getRandomInt(0, resp.length - 1)]);
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.listen(3000, () => console.log('Example app listening on port 3000!'));