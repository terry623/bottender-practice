const send = require('./send');
const db = require('./connectDB');

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

async function showMenu(context) {
  await context.sendText(`輸入 Start，開啟選單`);
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
      // FIXME: find another gif
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
        'https://media.giphy.com/media/Wn3JwcYYSMn5e/giphy.gif',
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

async function whatType(context) {
  const { data } = context.event.postback;
  const { action } = getUrlVars(data);
  switch (action) {
    case 'search':
      await send.specialGIF(context);
      break;
    case 'hot':
      await db.showAllSearch(context);
      break;
    case 'random':
      await send.randomGIF(context);
      break;
    default:
      await context.sendText(`Postback 發生錯誤`);
  }
}

module.exports = { showMenu, showCarousel, whatType };
