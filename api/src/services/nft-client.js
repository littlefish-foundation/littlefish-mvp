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
      'x-api-key': 'b4348a07f44e4700bcf19af0c6703016',
    },
  };

  try {
    response = await axios.request(options);
  } catch {
    if (response.status !== 200) throw new ApiError();
  }

  return response.data;
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

  if (response && response.status !== 201) throw new ApiError();

  return response.data;
}

module.exports = {
  getNfts,
  mintNft,
};
