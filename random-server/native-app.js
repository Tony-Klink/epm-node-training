const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

const url = 'mongodb://localhost:27017';
const dbName = 'homework';


const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('cities');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        findDocuments(db, function (docs) {
            res.json(docs[getRandomInt(0, docs.length - 1)]);
            client.close();
        });
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
