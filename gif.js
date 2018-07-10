const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient('WCyzh8Jtc3RNEOwPPELQy5QGhuHUGpwJ');

const search = async query => {
  const photoLimit = 20;
  const option = {
    q: query,
    limit: photoLimit,
  };
  const chooseImage = Math.floor(Math.random() * photoLimit);

  const { data } = await client.search('gifs', option);
  const { original: origin, fixed_width_small: preview } = data[
    chooseImage
  ].images;

  return [origin.gif_url, preview.gif_url];
};

const random = async () => {
  const {
    data: { images },
  } = await client.random('gifs', {});

  const { original: origin, fixed_width_small: preview } = images;

  return [origin.gif_url, preview.gif_url];
};

module.exports = { search, random };
