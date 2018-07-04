const gif = require('./gif');
const action = require('./action');

async function askQuery(context) {
  console.log('in ask');
  console.log(context.state);

  if (context.state.askingSearchString) {
    context.setState({
      searchString: context.event.text,
      askingSearchString: false,
    });
  } else {
    context.setState({ searchString: null, askingSearchString: true });
    await context.sendText('Hi, what do you want to search?');
  }
}

async function askNickname(context) {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname} !`);
    await action.showCarousel(context);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
  }
}

async function specialGIF(context) {
  console.log('in send');
  console.log(context.state);

  await askQuery(context);
  if (context.state.searchString !== null) {
    await context.sendText(`Search for ${context.state.searchString}.`);
    const urls = await gif.search(context.state.searchString);
    await context.replyImage(urls[0], urls[1]);
  }
}

async function randomGIF(context) {
  await context.sendText(`What's up ? ${context.state.nickname} ?`);
  await context.sendText(`Give you a special GIF`);
  const urls = await gif.random();
  await context.replyImage(urls[0], urls[1]);
}

module.exports = { askQuery, askNickname, randomGIF, specialGIF };
