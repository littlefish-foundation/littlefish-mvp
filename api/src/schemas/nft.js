const Joi = require('joi');

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
    assetName: Joi.string().required(),
    ownerName: Joi.string().required(),
    description: Joi.string().required(),
    mediaType: Joi.string().required(),
    image: Joi.string().base64().required(),
    youtubeLink: Joi.string().uri(),
    otherLink: Joi.string().uri(),
  },
);

module.exports = {
  getNftsFromBlokchain,
  getNftsFromDatabase,
  mintNft,
};
