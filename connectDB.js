const { MongoClient } = require('mongodb');

const username = process.env.MONGO_ACCOUNT;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0-ypcvv.mongodb.net/test?retryWrites=true`;

// TODO: 要做 error handling
function insertSearchHistory(context) {
  const { nickname, keyword } = context.state;
  MongoClient.connect(
    uri,
    (err, client) => {
      // FIXME: need to change collection name
      const collection = client.db('test').collection('devices');
      collection.insert({ nickname, keyword }, () => client.close());
    }
  );
}

function showAllSearch() {
  MongoClient.connect(
    uri,
    (err, client) => {
      // FIXME: need to change collection name
      const collection = client.db('test').collection('devices');
      collection.find({}).toArray((err2, docs) => {
        console.log(docs);
        client.close();
      });
    }
  );
}

module.exports = { insertSearchHistory, showAllSearch };
