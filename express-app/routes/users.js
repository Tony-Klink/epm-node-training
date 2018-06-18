import { Router } from 'express';
import userCollection from '../models/user';
import bodyParser from 'body-parser';
import { jwtVerify } from '../middlewares/jwtVerify';

const jsonParser = bodyParser.json();
const userRouter = Router();

userRouter.use(jsonParser);
userRouter.use(jwtVerify);


userRouter.get('/', (req, res, next) => {
    const users = userCollection.chain().find().data();
    if (users) {
        res.json(users);
    } else {
        next();
    }
})
export default userRouter;