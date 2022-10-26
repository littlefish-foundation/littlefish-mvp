const Joi = require('joi');
const { ACTION_MAX_ALLOWED_LENGTH } = require('../../constants');
const { actionQuerySchema, idParams } = require('./common');

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
    ...actionQuerySchema,
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
