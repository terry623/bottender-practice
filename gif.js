const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient('WCyzh8Jtc3RNEOwPPELQy5QGhuHUGpwJ');

function search(query) {
  const option = {
    q: query,
    limit: 1,
  };

  client
    .search('gifs', option)
    .then(response => {
      response.data.forEach(gifObject => {
        console.log(gifObject.images);
      });
    })
    .catch(err => console.log(err));
}

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
