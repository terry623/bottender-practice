const { LineBot, LineHandler } = require('bottender');
const { createServer } = require('bottender/express');
const { Line } = require('messaging-api-line');

const PORT = process.env.PORT || 5000;

const bot = new LineBot({
  channelSecret: 'a37375a40e56d4db2b0b73a53f2c8353',
  accessToken:
    'BO14M3aCS0TSVMlegbNshvEf+0s64FktENYaQE830oQnIAZlydlO4JvKd+bRo4sc/5hZI84xRyeCaMPp459v3QXSMPN7Ahx8qvsWMBu89xEhURKhRRzO1b90LU+2GYyepv/9n5HSbGi9OluomjnWLgdB04t89/1O/w1cDnyilFU=',
});

bot.setInitialState({
  asking: false,
  nickname: null,
});

async function askNickname(context) {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname}`);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
  }
}

const handler = new LineHandler()
  .onText(/yo/i, async context => {
    await askNickname(context);
    await context.replySticker('1', '1');
    await context.reply([
      Line.createText(`Hello ${context.state.nickname} !`),
      Line.createImage(
        'https://example.com/original.jpg',
        'https://example.com/preview.jpg'
      ),
      Line.createText('Nothing'),
    ]);
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
