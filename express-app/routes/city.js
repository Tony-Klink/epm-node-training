import { Router } from 'express';
import bodyParser from 'body-parser';
import { City } from '../models/city';

const cityRouter = Router();
const jsonParser = bodyParser.json();

cityRouter.use(jsonParser);

cityRouter.get('/', async (req, res, next) => {
    const cities = await City.find();
    if (cities) {
        res.json(cities);
    } else {
        res.status(404).send('Not Found');
    }
})

cityRouter.get('/:id', async (req, res, next) => {
    const cities = await City.findOne({ _id: req.params.id });
    if (cities) {
        res.json(cities);
    } else {
        res.status(404).send('Not Found');
    }
})

cityRouter.post('/', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    let city = new City(Object.assign(req.body, {lastModifiedDate: new Date()}));
    city.save();
    res.status(200).send('OK');
})

cityRouter.put('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    City.findByIdAndUpdate(req.params.id, Object.assign(req.body, {lastModifiedDate: new Date()})).then(() => {
        res.status(200).send('OK');
    }).catch((err) => res.status(500).send('server error' + err));
})

cityRouter.delete('/:id', async (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    City.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).send('OK');
    }).catch((err) => res.status(500).send('server error' + err));
})

export default cityRouter;