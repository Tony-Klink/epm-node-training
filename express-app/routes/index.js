import { Router } from 'express';
import productRouter from './products';
import userRouter from './users'

const router = Router();
router.use('/products', productRouter);
router.use('/users', userRouter);

export default router;