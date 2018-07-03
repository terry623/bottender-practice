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
  await context.sendText(url);
}

async function showCarousel(context) {
  context.replyCarouselTemplate('this is a carousel template', [
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: '找GIF',
      text: '隨便打個關鍵字',
      actions: [
        {
          type: 'postback',
          label: 'Go',
          data: 'action=search',
        },
      ],
    },
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: '熱門搜尋',
      text: '看看大家都找什麼',
      actions: [
        {
          type: 'postback',
          label: 'Go',
          data: 'action=hot',
        },
      ],
    },
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: '隨便啦',
      text: '什麼GIF都可以',
      actions: [
        {
          type: 'postback',
          label: 'Go',
          data: 'action=random',
        },
      ],
    },
  ]);
}

module.exports = { askNickname, sendRandomGIF, showCarousel };