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

async function searchString(context) {
  let query = null;
  if (context.state.askingSearchString) {
    context.setState({ askingSearchString: false });
    query = context.event.text;
  } else {
    context.setState({ askingSearchString: true });
    await context.sendText('Hi, what do you want to search?');
  }
  return query;
}

module.exports = { nickname, searchString };
