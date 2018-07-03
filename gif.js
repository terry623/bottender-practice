const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient('YOUR_API_KEY');

function search(query) {
  const option = {
    q: query,
    limit: 1,
  };

  client
    .search('gifs', option)
    .then(response => {
      response.data.forEach(gifObject => console.log(gifObject.images));
    })
    .catch(err => console.log(err));
}

function random() {
  client
    .random('gifs', {})
    .then(response => {
      console.log(response);
      response.data.forEach(gifObject => console.log(gifObject.images));
    })
    .catch(err => console.log(err));
}

module.exports = { search, random };
