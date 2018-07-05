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
    await context.sendText(`搜尋『${context.state.keyword}』`);
    try {
      const urls = await gif.search(context.state.keyword);
      await urlToReply(urls, context);
    } catch (error) {
      await context.sendText(`找不到相關的 GIF ><`);
    }
  }
}

async function randomGIF(context) {
  await context.sendText(`${context.state.nickname}，我隨便挑了個 GIF 給你 !`);
  try {
    const urls = await gif.random();
    await urlToReply(urls, context);
  } catch (error) {
    await context.sendText(`找不到相關的 GIF ><`);
  }
}

module.exports = { specialGIF, randomGIF };
