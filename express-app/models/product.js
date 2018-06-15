import uuid from 'uuid/v4';

import { db } from './index';
import Review from './review';

let productCollection = db.addCollection('product');

class Product {
    constructor(name, description, reviews) {
        this.id = uuid();
        this.name = name;
        this.description = description;
        this.reviews = reviews;
    }
    
}

productCollection.insert([
    new Product('product 1', 'sample product 1', [new Review('very good product!'), new Review('Nice!')]),
    new Product('product 2', 'sample product 2', [new Review('not so good product')])
])

export default productCollection;