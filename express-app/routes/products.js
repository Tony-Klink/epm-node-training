import { Router } from 'express';
import bodyParser from 'body-parser';
import productCollection from '../models/product';

const productRouter = Router();
const jsonParser = bodyParser.json();


productRouter.get('/', (req, res, next) => {
    const products = productCollection.chain().find().data();
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('there is none');
    }
})

productRouter.get('/:id', (req, res, next) => {
    const products = productCollection.findOne({id: req.params.id});
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('there is none');
    }
})

productRouter.get('/:id/reviews', (req, res, next) => {
    const products = productCollection.findOne({id: req.params.id}).reviews;
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('there is none');
    }
})

productRouter.post('/', jsonParser, (req, res, next) => {
    if(!req.body) return res.sendStatus(400);
    productCollection.insert(req.body);
    res.status(200).send('INSERTED');
})

export default productRouter;