const gif = require('./gif');
const ask = require('./ask');
const db = require('./connectDB');

async function urlToReply(urls, context) {
  const [origin, preview] = urls;
  await context.replyImage(origin, preview);
}

async function specialGIF(context) {
  await ask.keyword(context);
  if (context.state.keyword !== null) {
    db.insertSearchHistory(context);
    await context.sendText(`Search for ${context.state.keyword}.`);
    const urls = await gif.search(context.state.keyword);
    await urlToReply(urls, context);
  }
}

async function randomGIF(context) {
  await context.sendText(
    `Hey ${context.state.nickname}, give you a special GIF !`
  );
  const urls = await gif.random();
  await urlToReply(urls, context);
}

module.exports = { specialGIF, randomGIF };
