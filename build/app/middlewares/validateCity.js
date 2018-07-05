"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateCity = validateCity;
function validateCity(req, res, next) {
    !req.body.capital ? res.sendStatus(400) : next();
}