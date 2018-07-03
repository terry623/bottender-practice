const gif = require('./gif');

function getUrlVars(url) {
  const values = {};
  let hash;
  const hashes = url.split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    values[hash[0]] = hash[1];
  }
  return values;
}

// TODO: move ask function
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

async function askSearchString(context) {
  await context.sendText('Hi, what do you want to search?');
  // FIXME: ask not yet finish
  return 'girl';
}

// TODO: move send function
async function sendRandomGIF(context) {
  await context.sendText(`What's up ? ${context.state.nickname} ?`);
  await context.sendText(`Give you a special GIF`);
  const urls = await gif.random();
  await context.replyImage(urls[0], urls[1]);
  await context.sendText(urls[0]);
}

async function sendSpecialGIF(context) {
  const query = await askSearchString(context);
  await context.sendText(`Search for ${query}.`);
  const urls = await gif.search(query);
  await context.replyImage(urls[0], urls[1]);
  await context.sendText(urls[0]);
}

async function whatAction(context) {
  const { data } = context.event.postback;
  const { action } = getUrlVars(data);
  switch (action) {
    case 'search':
      await sendSpecialGIF(context);
      break;
    case 'hot':
      await context.sendText('hot not yet finish');
      break;
    case 'random':
      await sendRandomGIF(context);
      break;
    default:
      await context.sendText(`It is not a valid command.`);
  }
}

async function showCarousel(context) {
  context.replyCarouselTemplate('this is a carousel template', [
    {
      thumbnailImageUrl:
        'https://media.giphy.com/media/3o7bu1jl4jMGgWDUhq/giphy.gif',
      title: '找個GIF',
      text: '隨便打些關鍵字',
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
        'https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif',
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
        'https://media.giphy.com/media/57UCJutzbAWdUrVIyv/giphy.gif',
      title: '都可以啦',
      text: '什麼GIF都好',
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

module.exports = { askNickname, sendRandomGIF, showCarousel, whatAction };
