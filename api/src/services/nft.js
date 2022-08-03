const nftServiceClient = require('./nft-client');
const NftModel = require('../models/nft');
const { prepareAllImageURLsInFile, prepareImageURL } = require('../logics/nft');
const ApiError = require('../errors/api-error');

async function getNftsFromBlokchain(cursor, size) {
  const response = await nftServiceClient.getNfts(cursor, size);

  if (response?.status !== 200) {
    throw new ApiError(response.message, response.status);
  }
  return response.data;
}

async function getNftsFromDatabase(page = 0, limit = 10) {
  return NftModel.find().skip(page * limit).limit(limit).lean()
    .exec();
}

async function mintNft(nft) {
  const toMint = {
    tokens: nft.tokens,
  };

  const response = await nftServiceClient.mintNft(toMint);
  const createdNft = response?.data?.data[0];
  const preparedFiles = prepareAllImageURLsInFile(createdNft.files);

  await NftModel.create({
    asset_name: createdNft.asset_name,
    nftId: createdNft.id,
    name: createdNft.name,
    fingerprint: createdNft.fingerprint,
    description: createdNft.description,
    media_type: createdNft.media_type,
    image: prepareImageURL(createdNft.image),
    status: createdNft.status,
    files: preparedFiles,
    metadata: createdNft.metadata,
    custom_attributes: createdNft.custom_attributes,
  });
  return {
    success: true,
  };
}

module.exports = {
  getNftsFromDatabase,
  getNftsFromBlokchain,
  mintNft,
};
