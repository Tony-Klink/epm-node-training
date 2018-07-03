import { Router } from 'express';
import authRouter from './auth';
import productRouter from './products';
import userRouter from './users'
import cityRouter from './city';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/cities', cityRouter);

export default router;