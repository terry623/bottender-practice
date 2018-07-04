const { MongoClient } = require('mongodb');

// FIXME: username & password need to hide
const username = process.env.MONGO_ACCOUNT;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0-ypcvv.mongodb.net/test?retryWrites=true`;

function insertDocument(data, collection, callback) {
  collection.insert(data, (err, result) => {
    console.log('Inserted 1 documents into the collection');
    callback(result);
  });
}

function insertSearchHistory(data) {
  MongoClient.connect(
    uri,
    (err, client) => {
      const collection = client.db('test').collection('devices');
      insertDocument(data, collection, () => {
        collection.find({}).toArray((err2, docs) => {
          console.log('Found the following records');
          console.log(docs);
          client.close();
        });
      });
    }
  );
}

module.exports = { insertSearchHistory };
