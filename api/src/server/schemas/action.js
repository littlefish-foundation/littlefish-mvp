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
        filter: Joi.object().default({}),
        sorter: Joi.object().default({}),
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
        assetName: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
        ownerName: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
        actionType: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
        description: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH * 4).required(),
        mediaType: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
        image: Joi.string().base64().required(),
        links: Joi.array(),
        colonyName: Joi.string().required(),
        walletID: Joi.string().required(),
        price: Joi.number().required(),
      },
    ),
  },
};
