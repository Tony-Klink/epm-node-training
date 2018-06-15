import { db } from './index';

class User {
    constructor(name) {
        this.name = name;
    }
}

let userCollection = db.addCollection('user');

userCollection.insert([new User('John'), new User('Doe'), new User('Jane')])

export default userCollection;