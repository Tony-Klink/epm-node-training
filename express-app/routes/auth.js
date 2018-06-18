import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import userCollection from '../models/user';

const jsonParser = bodyParser.json();
const authRouter = Router();

let errorResponse = (responseData) => ({
    code: 404,
    message: 'Not Found',
    data: responseData
});

let successResponse = (responseData, token) => ({
    code: 200,
    message: 'OK',
    data: {user: {username: responseData.name, email: responseData.email}},
    token: token
});

authRouter.post('/', jsonParser,(req, res) => {
    if(!req.body.login || !req.body.password && req.body.password.length === 0) return res.json(errorResponse('Wrong request')).status(404);

    const authUser = userCollection.findOne({name: req.body.login, password: req.body.password});

    if(!authUser) return res.json(errorResponse('Wrong login or password'));

    const token = jwt.sign({tokenSuccess: true}, 'SECRET_KEY');
    const responseObject = successResponse(authUser, token)

    res.json(responseObject);
})

export default authRouter;