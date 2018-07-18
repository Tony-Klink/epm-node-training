const City = require('../../models/city').City;


module.exports = {
    findCities: findCities,
    addCity: addCity,
    findCityById: findCityById,
    updateCityById: updateCityById,
    deleteCityById: deleteCityById
};

function findCities(req, res) {
    City.find((err, results) => {
        if (!err) {
            res.json(results);
        } else {
            res.status(404).send('Not Found');
        }
    });
}

function addCity(req, res) {
    if (!req.body) return res.sendStatus(405);
    let city = new City(Object.assign(req.body, {lastModifiedDate: new Date()}));
    city.save((err, city) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.status(200).send({status:'OK'});
        }
    });
}

function findCityById(req, res) {
    const cityId = req.swagger.params.cityId.value;

    City.findOne({ _id: cityId }, (err, results) => {
        console.log(cityId);
        if (!err) {
            res.json(results);
        } else {
            res.status(404).send('Not Found');
        }
    });
}

function updateCityById(req, res) {
    const cityId = req.swagger.params.cityId.value;

    if (!req.body) return res.sendStatus(400);
    City.findByIdAndUpdate(cityId, Object.assign(req.body, {lastModifiedDate: new Date()})).then(() => {
        res.status(200).send({status:'OK'});
    }).catch((err) => res.status(500).send('server error' + err));
}

function deleteCityById(req, res) {
    const cityId = req.swagger.params.cityId.value;
    
    City.deleteOne({ _id: cityId }).then(() => {
        res.status(200).send({status:'OK'});
    }).catch((err) => res.status(500).send('server error' + err));
}