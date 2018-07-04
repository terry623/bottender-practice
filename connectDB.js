const { MongoClient } = require('mongodb');

const username = process.env.MONGO_ACCOUNT;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0-ypcvv.mongodb.net/test?retryWrites=true`;
// FIXME: need to change collection name
const table = `devices`;

// TODO: 要做 error handling
function insertSearchHistory(context) {
  const { nickname, keyword } = context.state;
  MongoClient.connect(
    uri,
    (err, client) => {
      const collection = client.db('test').collection(table);
      collection.insert({ nickname, keyword }, () => client.close());
    }
  );
}

async function showAllSearch(context) {
  MongoClient.connect(
    uri,
    (err, client) => {
      const collection = client.db('test').collection(table);
      collection.find({}).toArray(async (err2, docs) => {
        await context.sendText(docs);
        client.close();
      });
    }
  );
}

module.exports = { insertSearchHistory, showAllSearch };
