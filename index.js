const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');
// const { Line } = require('messaging-api-line');

const PORT = process.env.PORT || 5000;
const config = require('./config');
const gif = require('./gif');

const bot = new LineBot(config.line);

bot.setInitialState({
  asking: false,
  nickname: null,
});

async function askNickname(context) {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname} !`);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
    await context.replySticker('1', '1');
  }
}

bot.onEvent(async context => {
  if (context.state.nickname === null) {
    await askNickname(context);
  } else {
    await context.sendText(`What's up ? ${context.state.nickname} ?`);
    await context.sendText(`Give you a special GIF`);
    const url = await gif.random();
    await context.replyImage(url, url);
  }
});

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
