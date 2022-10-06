const Joi = require('joi');
const { ACTION_MAX_ALLOWED_LENGTH } = require('../../constants');

const idParams = {
  params: Joi.object(
    {
      id: Joi.string().required(),
    },
  ),
};

module.exports = {
  getAction: {
    ...idParams,
  },
  syncActionStatus: {
    ...idParams,
  },
  getSale: {
    ...idParams,
  },
  deleteAction: {
    ...idParams,
  },
  getSales: {
    query: Joi.object(
      {
        size: Joi.number().integer().positive().default(10),
      },
    ),
  },
  getActions: {
    query: Joi.object(
      {
        name: Joi.string(),
        producerName: Joi.string(),
        status: Joi.string(),
        type: Joi.string(),
        minDate: Joi.date(),
        maxDate: Joi.date(),
        sortingOrder: Joi.string().valid('asc', 'desc').default('desc'),
        sortingField: Joi.string(),
        page: Joi.number().integer().default(0),
        limit: Joi.number().integer().positive().default(20),
      },
    ),
  },
  createActionSale: {
    ...idParams,
    query: Joi.object(
      {
        price: Joi.number().integer().min(10),
      },
    ),
  },
  mintAction: {
    body: Joi.object(
      {
        name: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
        producerName: Joi.string().required(),
        types: Joi.array().required(),
        description: Joi.string().required(),
        mediaType: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
        image: Joi.string().base64().required(),
        links: Joi.array().items(Joi.object({
          url: Joi.string().required(),
          urlName: Joi.string().required(),
        })),
        files: Joi.array().items(Joi.object({
          type: Joi.string().required(),
          src: Joi.string().required(),
        })),
        colony: Joi.string().required(),
        walletAddress: Joi.string().required(),
        minimumPrice: Joi.number().default(0).greater(-1),
      },
    ),
  },
};
