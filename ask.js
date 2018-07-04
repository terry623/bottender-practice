async function keyword(context) {
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

async function nickname(context) {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname} !`);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
  }
}

module.exports = { nickname, keyword };
