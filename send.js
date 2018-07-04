const gif = require('./gif');
const ask = require('./ask');

async function specialGIF(context) {
  console.log('in send');
  console.log(context.state);

  await ask.keyword(context);
  if (context.state.searchString !== null) {
    await context.sendText(`Search for ${context.state.searchString}.`);
    const urls = await gif.search(context.state.searchString);
    await context.replyImage(urls[0], urls[1]);
  }
}

async function randomGIF(context) {
  await context.sendText(`What's up ? ${context.state.nickname} ?`);
  await context.sendText(`Give you a special GIF`);
  const urls = await gif.random();
  await context.replyImage(urls[0], urls[1]);
}

module.exports = { specialGIF, randomGIF };
