import { Router } from 'express';
import { User } from '../models/user';
import bodyParser from 'body-parser';
import { jwtVerify } from '../middlewares/jwtVerify';

const jsonParser = bodyParser.json();
const userRouter = Router();

userRouter.use(jsonParser);
userRouter.use(jwtVerify);


userRouter.get('/', async (req, res, next) => {
    const users = await User.findAll();
    if (users) {
        res.json(users);
    } else {
        res.status(404).send('Not Found');
    }
})
export default userRouter;