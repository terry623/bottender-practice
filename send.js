const gif = require('./gif');
const ask = require('./ask');

async function randomGIF(context) {
  await context.sendText(`What's up ? ${context.state.nickname} ?`);
  await context.sendText(`Give you a special GIF`);
  const urls = await gif.random();
  await context.replyImage(urls[0], urls[1]);
}

async function specialGIF(context) {
  const query = await ask.searchString(context);
  await context.sendText(`Search for ${query}.`);
  const urls = await gif.search(query);
  await context.replyImage(urls[0], urls[1]);
}

module.exports = { randomGIF, specialGIF };
