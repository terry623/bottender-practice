const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');

const PORT = process.env.PORT || 5000;
const config = require('./bottender.config');
const action = require('./action');
const send = require('./send');
const ask = require('./ask');

const bot = new LineBot(config.line);

bot.setInitialState({
  asking: false,
  nickname: null,
  askingSearchString: false,
  searchString: null,
});

// FIXME: remove lots of ifelse
const handler = new LineHandler().onEvent(async context => {
  if (context.state.nickname === null) {
    const { asking } = context.state;
    await ask.nickname(context);
    if (asking) await action.showMenu(context);
  } else if (context.state.askingSearchString === true) {
    await send.specialGIF(context);
    await action.showMenu(context);
  } else if (context.event.isPostback) {
    await action.whatType(context);
    await action.showMenu(context);
  } else if (context.event.isText) {
    const { text } = context.event.message;
    if (/^start/i.test(text)) await action.showCarousel(context);
    else context.sendText(`I don't understand.`);
  }
});
// .onError(async context => {
//   await context.sendText('Something wrong happened.');
// });

bot.onEvent(handler);

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
