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
    if (context.state.nickname === null) {
      await helper.askNickname(context);
    } else if (context.event.isText) {
      await helper.sendRandomGIF(context, gif);
      await helper.showCarousel(context);
    }
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
