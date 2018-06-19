import { Router } from 'express';
import * as plStr from 'passport-local';
import passport from 'passport';
import authRouter from './auth';
import productRouter from './products';
import userRouter from './users'

const LocalStrategy = plStr.Strategy;
passport.use(new LocalStrategy((username, password, done) => {
    
}))

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;