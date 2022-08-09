const axios = require('axios');
const ApiError = require('../errors/api-error');

async function getNfts(cursor = undefined, size = 10) {
  let response;
  const options = {
    method: 'GET',
    url: `${process.env.NFT_SERVICE_URL}v1/nft/collections/${process.env.NFT_BASE_COLLECTION_ID}/tokens`,
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
async function mintNft(nft) {
  const options = {
    method: 'POST',
    url: `${process.env.NFT_SERVICE_URL}v1/nft/collections/${process.env.NFT_BASE_COLLECTION_ID}/tokens`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY,
    },
    data: nft,
  };

  const response = await axios.request(options);
  if (response && response.status !== 201) {
    throw new ApiError();
  }

  return response;
}

module.exports = {
  getNfts,
  mintNft,
};
