const axios = require('axios');
const config = require('../config');

const shortenUrl = async (url) => {
  const options = {
    method: 'POST',
    url: `${config.tinyURL.urL}create`,
    params: {
      api_token: config.tinyURL.apiToken,
      url,
    },
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
  };

  let response;
  try {
    response = await axios.request(options);
  } catch (error) {
    console.log(error);
  }
  return `${response.data.domain}/${response.data.alias}`;
};

module.exports = shortenUrl;
