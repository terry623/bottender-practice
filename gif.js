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

function random() {
  client
    .random('gifs', {})
    .then(response => {
      const { images } = response.data.images;
      const picture = images.original;
      return picture.url;
    })
    .catch(err => console.log(err));
}

module.exports = { search, random };
