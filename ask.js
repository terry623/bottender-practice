async function keyword(context) {
  if (context.state.askingKeyword) {
    context.setState({ keyword: context.event.text, askingKeyword: false });
  } else {
    context.setState({ keyword: null, askingKeyword: true });
    await context.sendText(`${context.state.nickname}，你想搜尋什麼 GIF ?`);
  }
}

async function nickname(context) {
  if (context.state.askingNickname) {
    context.setState({ nickname: context.event.text, askingNickname: false });
    await context.sendText(`嗨，${context.state.nickname} !`);
  } else {
    context.resetState();
    context.setState({ askingNickname: true });
    await context.sendText('該怎麼稱呼你呢 ?');
  }
}

module.exports = { nickname, keyword };
