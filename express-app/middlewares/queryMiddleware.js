export function parseQuery(req, res, next) {
    req.parsedQuery = req.query;
    console.log('Parsed query: ' + JSON.stringify(req.parsedQuery));
    next();
}