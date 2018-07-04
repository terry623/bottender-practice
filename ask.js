const action = require('./action');

async function nickname(context) {
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

async function searchString(context) {
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

module.exports = { nickname, searchString };
