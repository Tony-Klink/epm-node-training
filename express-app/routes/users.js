import { Router } from 'express';
import userCollection from '../models/user';

const userRouter = Router();


userRouter.get('/', (req, res, next) => {
    const users = userCollection.chain().find().data();
    if (users) {
        res.json(users);
    } else {
        next();
    }
})
export default userRouter;