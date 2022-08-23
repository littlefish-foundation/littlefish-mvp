const Joi = require('joi');

const colonyNameParams = {
  params: Joi.object(
    {
      colonyName: Joi.string().required(),
    },
  ),
};

const getColony = {
  ...colonyNameParams,
};

const deleteColony = {
  ...colonyNameParams,
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
      coverImage: Joi.object({
        type: Joi.string().required(),
        src: Joi.string().uri().required(),
      }),
      files: Joi.array().items(Joi.object({
        type: Joi.string().required(),
        src: Joi.string().uri().required(),
      })),
      links: Joi.object(),
    },
  ),
};
const createColonyPreSignedUrls = {
  body: Joi.object({
    files: Joi.array().items(Joi.object({
      type: Joi.string().required(),
      name: Joi.string().required(),
    })),
    coverImage: Joi.object({
      type: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }),
};
module.exports = {
  getColony,
  deleteColony,
  getColonies,
  getColonyActions,
  createColony,
  createColonyPreSignedUrls,
};
