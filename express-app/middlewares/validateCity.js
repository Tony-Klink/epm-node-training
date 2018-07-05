export function validateCity(req, res, next) {
    !req.body.capital ? res.sendStatus(400) : next();
}