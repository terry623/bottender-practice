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
  }
}

bot.onEvent(async context => {
  if (context.state.nickname === null) {
    await askNickname(context);
    await context.replySticker('1', '1');
  } else {
    await context.sendText(`What's up ? ${context.state.nickname} ?`);
    const url = gif.random();
    await context.replyImage(url, url);
  }
});

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
