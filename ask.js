async function keyword(context) {
  if (context.state.askingKeyword) {
    context.setState({
      keyword: context.event.text,
      askingKeyword: false,
    });
  } else {
    context.setState({ keyword: null, askingKeyword: true });
    await context.sendText(
      `Hey ${context.state.nickname}, what do you want to search?`
    );
  }
}

async function nickname(context) {
  if (context.state.askingNickname) {
    context.setState({ nickname: context.event.text, askingNickname: false });
    await context.sendText(`Hello ${context.state.nickname} !`);
  } else {
    context.resetState();
    context.setState({ askingNickname: true });
    await context.sendText("Hey, what's your nickname?");
  }
}

module.exports = { nickname, keyword };
