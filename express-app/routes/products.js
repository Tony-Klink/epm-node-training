import { Router } from 'express';
import bodyParser from 'body-parser';
import { jwtVerify } from '../middlewares/jwtVerify';
import productCollection from '../models/product';

const productRouter = Router();
const jsonParser = bodyParser.json();

productRouter.use(jsonParser);
productRouter.use(jwtVerify);

productRouter.get('/', (req, res, next) => {
    const products = productCollection.chain().find().data();
    if (products) {
        res.json(products);
    } else {
        next();
    }
})

productRouter.get('/:id', (req, res, next) => {
    const products = productCollection.findOne({id: req.params.id});
    if (products) {
        res.json(products);
    } else {
        next();
    }
})

productRouter.get('/:id/reviews', (req, res, next) => {
    const products = productCollection.findOne({id: req.params.id}).reviews;
    if (products) {
        res.json(products);
    } else {
        next();
    }
})

productRouter.post('/', (req, res, next) => {
    if(!req.body) return res.sendStatus(400);
    productCollection.insert(req.body);
    res.sendStatus(200);
})

export default productRouter;