const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const PORT = process.env.PORT || 5000;
const config = require('./bottender.config');
const action = require('./action');
const send = require('./send');
const ask = require('./ask');

const bot = new LineBot(config.line);

bot.setInitialState({
  askingNickname: false,
  nickname: null,
  askingKeyword: false,
  keyword: null,
});

// FIXME: 把 處理 state 的整理在一起
const handler = new LineHandler()
  .onEvent(async context => {
    if (context.state.nickname === null) {
      const { askingNickname } = context.state;
      await ask.nickname(context);
      if (askingNickname) await action.showMenu(context);
    } else if (context.state.askingKeyword === true) {
      await send.specialGIF(context);
    } else if (context.event.isPostback) {
      await action.whatType(context);
    } else if (context.event.isText) {
      const { text } = context.event.message;
      if (/^start/i.test(text)) await action.showCarousel(context);
      else {
        await context.sendText(`I don't understand this commend.`);
        await action.showMenu(context);
      }
    }
  })
  .onError(async (context, error) => {
    console.log(error);
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
