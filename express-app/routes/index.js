import { Router } from 'express';
import authRouter from './auth';
import productRouter from './products';
import userRouter from './users'

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;