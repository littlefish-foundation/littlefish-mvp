const Joi = require('joi');

const getColony = {
  params: Joi.object(
    {
      colonyName: Joi.string().required(),
    },
  ),
};

const getColonies = {
  query: Joi.object(
    {
      page: Joi.number().integer().positive(),
      limit: Joi.number().integer().positive(),
    },
  ),
};

const getColonyActions = {
  params: Joi.object(
    {
      colonyName: Joi.string().required(),
    },
  ),
  query: Joi.object(
    {
      filter: Joi.object(),
      sorter: Joi.object(),
      page: Joi.number().integer().positive(),
      limit: Joi.number().integer().positive(),
    },
  ),
};
const createColony = {
  body: Joi.object(
    {
      name: Joi.string().required(),
      description: Joi.string().required(),
      walletAddress: Joi.string().required(),
      superColony: Joi.string(),
      coverImage: Joi.string(),
      files: Joi.array(),
    },
  ),
};
const createColonyPreSignedUrls = {
  body: Joi.object({
    files: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      src: Joi.string().uri().required(),
    })),
  }),
};
module.exports = {
  getColony,
  getColonies,
  getColonyActions,
  createColony,
  createColonyPreSignedUrls,
};
