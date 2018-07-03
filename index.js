const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const PORT = process.env.PORT || 5000;
const config = require('./bottender.config');
const gif = require('./gif');
const helper = require('./helper');

const bot = new LineBot(config.line);

bot.setInitialState({
  asking: false,
  nickname: null,
});

const handler = new LineHandler()
  .onEvent(async context => {
    console.log('hello');
    if (context.state.nickname === null) {
      await helper.askNickname(context);
    } else if (context.event.isText) {
      const { text } = context.event.message;
      if (/^random/i.test(text)) await helper.sendRandomGIF(context, gif);
      else if (/^show/i.test(text)) await helper.showCarousel(context);
      else context.sendText(`I don't understand.`);
    }
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
