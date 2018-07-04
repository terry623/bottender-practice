const { MongoClient } = require('mongodb');

const username = process.env.MONGO_ACCOUNT;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0-ypcvv.mongodb.net/test?retryWrites=true`;
// FIXME: need to change collection name
const table = `temp`;

function docsToString(docs) {
  let result = '';
  docs.forEach(element => {
    const { nickname, keyword } = element;
    result += nickname.concat(' 搜尋了 ', keyword, '\n');
  });
  return result;
}

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
        const result = docsToString(docs);
        await context.sendText(result);
        client.close();
      });
    }
  );
}

module.exports = { insertSearchHistory, showAllSearch };
