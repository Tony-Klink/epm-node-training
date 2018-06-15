export function cookieParser(req, res, next) {
    req.parsedCookies = req.get('Cookie');
    console.log('Pared cookie: ' + req.parsedCookies);
    next();
}