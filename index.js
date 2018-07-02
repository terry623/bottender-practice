const { LineBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new LineBot({
  channelSecret: '9f23e66aaa2424c3f2d3bb6f5f2bdf58',
  accessToken:
    'HKSgKuNtRKYeucrBIKjTAE7nwNAHfmnY+bPcbTERgpmcHxq5/PeCLiQ8crRdWHPHrv4DhNQEdBBJm5Meax5x7E+wDozspxYJfUa4k13n0wkCuji8miB+nUfJDQvbQI4CMWAm2UiQztmipMcvwH2D+AdB04t89/1O/w1cDnyilFU=',
});

bot.onEvent(async context => {
  await context.sendText('Hello World Test');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
