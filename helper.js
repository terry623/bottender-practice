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

async function sendRandomGIF(context, gif) {
  await context.sendText(`What's up ? ${context.state.nickname} ?`);
  await context.sendText(`Give you a special GIF`);
  const url = await gif.random();
  await context.replyImage(url, url);
}

async function showCarousel(context) {
  context.replyCarouselTemplate('this is a carousel template', [
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: 'this is menu',
      text: 'description',
      actions: [
        {
          type: 'postback',
          label: 'Buy',
          data: 'action=buy&itemid=111',
        },
        {
          type: 'postback',
          label: 'Add to cart',
          data: 'action=add&itemid=111',
        },
        {
          type: 'uri',
          label: 'View detail',
          uri: 'http://example.com/page/111',
        },
      ],
    },
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/xThtadhNmxBdhfB3iM/giphy.gif',
      title: 'this is menu',
      text: 'description',
      actions: [
        {
          type: 'postback',
          label: 'Buy',
          data: 'action=buy&itemid=222',
        },
        {
          type: 'postback',
          label: 'Add to cart',
          data: 'action=add&itemid=222',
        },
        {
          type: 'uri',
          label: 'View detail',
          uri: 'http://example.com/page/222',
        },
      ],
    },
  ]);
}

module.exports = { askNickname, sendRandomGIF, showCarousel };
