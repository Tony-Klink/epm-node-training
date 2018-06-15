'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cookieParser = cookieParser;
function cookieParser(req, res, next) {
    req.parsedCookies = req.get('Cookie');
    console.log('Pared cookie: ' + req.parsedCookies);
    next();
}