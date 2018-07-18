const Product = require('../../models/product').Product;


module.exports = {
    findProducts: findProducts,
    addProduct: addProduct,
    findProductById: findProductById,
    deleteProductById: deleteProductById,
    findReviewsByProductId: findReviewsByProductId
};

function findProducts(req, res) {
    Product.find((err, results) => {
        if (!err) {
            res.json(results);
        } else {
            res.status(404).send('Not Found');
        }
    });
}

function addProduct(req, res) {
    if (!req.body) return res.sendStatus(400);
    let product = new Product(req.body);

    product.save((err, product) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.status(200).send({status:'OK'});
        }
    });
}

function findProductById(req, res) {
    const productId = req.swagger.params.productId.value;
    Product.findOne({ _id: productId }, (err, products) => {
        if (products) {
            res.json(products);
        } else {
            res.status(404).send('Not Found');
        }
    });
}

function deleteProductById(req, res) {
    const productId = req.swagger.params.productId.value;
    Product.deleteOne({ _id:productId }).then(() => {
        res.status(200).send({status:'OK'});
    }).catch((err) => res.status(500).send('server error' + err));
}

function findReviewsByProductId(req, res) {
    const productId = req.swagger.params.productId.value;
    Product.findOne({ _id: productId }, (err, product) => {
        if (product) {
            console.log(product.reviews);
            res.json({reviews: product.reviews});
        } else {
            res.status(404).send('Not Found');
        }
    });
}