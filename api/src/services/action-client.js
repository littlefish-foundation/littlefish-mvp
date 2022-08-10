const axios = require('axios');
const ApiError = require('../errors/api-error');

async function getActions(cursor = undefined, size = 10) {
  let response;
  const options = {
    method: 'GET',
    url: `${process.env.ACTION_SERVICE_URL}v1/action/collections/${process.env.ACTION_BASE_COLLECTION_ID}/tokens`,
    params: { size, cursor },
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY,
    },
  };

  try {
    response = await axios.request(options);
  } catch {
    if (response.status !== 200) throw new ApiError('Blockchain Server Error', 500);
  }

  return response;
}
async function mintAction(action) {
  const options = {
    method: 'POST',
    url: `${process.env.ACTION_SERVICE_URL}v1/action/collections/${process.env.ACTION_BASE_COLLECTION_ID}/tokens`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY,
    },
    data: action,
  };

  const response = await axios.request(options);
  if (response && response.status !== 201) {
    throw new ApiError();
  }

  return response;
}

module.exports = {
  getActions,
  mintAction,
};
