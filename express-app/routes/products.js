import { Router } from 'express';
import bodyParser from 'body-parser';
import { jwtVerify } from '../middlewares/jwtVerify';
import { Product } from '../models/product';

const productRouter = Router();
const jsonParser = bodyParser.json();

productRouter.use(jsonParser);
// productRouter.use(jwtVerify);

productRouter.get('/', async (req, res, next) => {
    const products = await Product.find();
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Not Found');
    }
})

productRouter.get('/:id', async (req, res, next) => {
    const products = await Product.findOne({ _id: req.params.id });
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Not Found');
    }
})

productRouter.get('/:id/reviews', async (req, res, next) => {
    const products = await Product.findOne({ _id: req.params.id }).reviews;
    if (products) {
        res.json(products);
    } else {
        res.status(404).send('Not Found');
    }
})

productRouter.post('/', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    let product = new Product(req.body);
    product.save((err, product) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.status(200).send('OK');
        }
    });
})

productRouter.delete('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    Product.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).send('OK');
    }).catch((err) => res.status(500).send('server error' + err));
})

export default productRouter;