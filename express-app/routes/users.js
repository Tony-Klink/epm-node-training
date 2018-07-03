import { Router } from 'express';
import { User } from '../models/user';
import bodyParser from 'body-parser';
import { jwtVerify } from '../middlewares/jwtVerify';

const jsonParser = bodyParser.json();
const userRouter = Router();

userRouter.use(jsonParser);
userRouter.use(jwtVerify);


userRouter.get('/', async (req, res, next) => {
    const users = await User.find();
    if (users) {
        res.json(users);
    } else {
        res.status(404).send('Not Found');
    }
})

userRouter.delete('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    User.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).send('OK');
    }).catch((err) => res.status(500).send('server error' + err));
})
export default userRouter;