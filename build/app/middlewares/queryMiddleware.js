'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseQuery = parseQuery;
function parseQuery(req, res, next) {
    req.parsedQuery = req.query;
    console.log('Parsed query: ' + JSON.stringify(req.parsedQuery));
    next();
}