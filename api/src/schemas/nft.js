const Joi = require('joi');
const { NFT_MAX_ALLOWED_LENGTH } = require('../constants');

const getNftsFromBlokchain = Joi.object(
  {
    cursor: Joi.string(),
    size: Joi.number().integer().positive(),
  },
);
const getNftsFromDatabase = Joi.object(
  {
    page: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
  },
);
const mintNft = Joi.object(
  {
    name: Joi.string().required(),
    assetName: Joi.string().length(NFT_MAX_ALLOWED_LENGTH).required(),
    ownerName: Joi.string().length(NFT_MAX_ALLOWED_LENGTH).required(),
    description: Joi.string().length(NFT_MAX_ALLOWED_LENGTH * 4).required(),
    mediaType: Joi.string().length(NFT_MAX_ALLOWED_LENGTH).required(),
    image: Joi.string().base64().required(),
    youtubeLink: Joi.string().length(NFT_MAX_ALLOWED_LENGTH * 2).uri(),
    otherLink: Joi.string().length(NFT_MAX_ALLOWED_LENGTH * 2).uri(),
  },
);

module.exports = {
  getNftsFromBlokchain,
  getNftsFromDatabase,
  mintNft,
};
