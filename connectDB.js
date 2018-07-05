const { MongoClient } = require('mongodb');

const username = process.env.MONGO_ACCOUNT;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0-ypcvv.mongodb.net/test?retryWrites=true`;
// FIXME: need to change collection name
const table = `temp4`;

async function docsToSend(context, docs) {
  console.log(docs);
  let people = docs[0].nickname;
  let result = '';

  for (let i = 0; i < docs.length; i++) {
    const { nickname, keyword } = docs[i];
    if (people !== nickname) {
      result += '\n';
      people = nickname;
    }
    result += nickname.concat(' 搜尋了 ', keyword);
    if (i !== docs.length - 1) result += '\n';
  }
  console.log(result);
  await context.sendText(result);
}

// const data = [
//   {
//     nickname: 'Terry',
//     keyword: 'Panda',
//   },
//   {
//     nickname: 'Terry',
//     keyword: 'Cat',
//   },
//   {
//     nickname: 'Emma',
//     keyword: 'Cat',
//   },
//   {
//     nickname: 'Emma',
//     keyword: 'Dog',
//   },
//   {
//     nickname: 'Jimmy',
//     keyword: 'Cat',
//   },
//   {
//     nickname: 'Jimmy',
//     keyword: 'Dog',
//   },
//   {
//     nickname: 'ggg',
//     keyword: 'Cat',
//   },
// ];
// docsToSend('context', data);

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
        if (docs.length > 0) await docsToSend(context, docs);
        else await context.sendText('目前沒有資料 ><');
        client.close();
      });
    }
  );
}

module.exports = { insertSearchHistory, showAllSearch };
