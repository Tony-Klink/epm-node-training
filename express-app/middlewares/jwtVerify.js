import jwt from 'jsonwebtoken';

export function jwtVerify(req, res, next) {
    const decoded = jwt.verify(req.body.token, 'SECRET_KEY');
    console.log('Token: ' + JSON.stringify(decoded));
    next();
}