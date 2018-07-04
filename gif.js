const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient('WCyzh8Jtc3RNEOwPPELQy5QGhuHUGpwJ');

const search = query =>
  new Promise(resolve => {
    const photoLimit = 20;
    const option = {
      q: query,
      limit: photoLimit,
    };

    client
      .search('gifs', option)
      .then(response => {
        const chooseImage = Math.floor(Math.random() * photoLimit);
        const { original: origin, fixed_width_small: preview } = response.data[
          chooseImage
        ].images;

        resolve([origin.gif_url, preview.gif_url]);
      })
      .catch(err => console.log(err));
  });

const random = () =>
  new Promise(resolve => {
    client
      .random('gifs', {})
      .then(response => {
        const {
          original: origin,
          fixed_width_small: preview,
        } = response.data.images;

        resolve([origin.gif_url, preview.gif_url]);
      })
      .catch(err => console.log(err));
  });

module.exports = { search, random };
