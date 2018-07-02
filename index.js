const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');
const PORT = process.env.PORT || 5000;

const bot = new LineBot({
  channelSecret: 'a37375a40e56d4db2b0b73a53f2c8353',
  accessToken:
    'BO14M3aCS0TSVMlegbNshvEf+0s64FktENYaQE830oQnIAZlydlO4JvKd+bRo4sc/5hZI84xRyeCaMPp459v3QXSMPN7Ahx8qvsWMBu89xEhURKhRRzO1b90LU+2GYyepv/9n5HSbGi9OluomjnWLgdB04t89/1O/w1cDnyilFU=',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
