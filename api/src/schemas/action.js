const Joi = require('joi');
const { ACTION_MAX_ALLOWED_LENGTH } = require('../constants');

const assetNameParams = {
  params: Joi.object(
    {
      assetName: Joi.string().required(),
    },
  ),
};
const getAction = {
  ...assetNameParams,
};

const getSale = {
  ...assetNameParams,
};

const deleteAction = {
  ...assetNameParams,
};

const getActionsFromBlockchain = {
  query: Joi.object(
    {
      cursor: Joi.string(),
      size: Joi.number().integer().positive(),
    },
  ),
};

const getSales = {
  query: Joi.object(
    {
      size: Joi.number().integer().positive(),
    },
  ),
};

const getActions = {
  query: Joi.object(
    {
      filter: Joi.object(),
      sorter: Joi.object(),
      page: Joi.number().integer().positive(),
      limit: Joi.number().integer().positive(),
    },
  ),
};

const createActionSale = {
  ...assetNameParams,
  query: Joi.object(
    {
      price: Joi.number().integer().min(10),
    },
  ),
};

const mintAction = {
  body: Joi.object(
    {
      name: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
      assetName: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
      ownerName: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
      actionType: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
      description: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH * 4).required(),
      mediaType: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH).required(),
      image: Joi.string().base64().required(),
      youtubeLink: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH * 2).allow(null, '').uri(),
      otherLink: Joi.string().max(ACTION_MAX_ALLOWED_LENGTH * 2).allow(null, '').uri(),
      colonyName: Joi.string().required(),
      walletID: Joi.string().required(),
      price: Joi.number().required(),
    },
  ),
};

module.exports = {
  getActionsFromBlockchain,
  getActions,
  getAction,
  deleteAction,
  mintAction,
  createActionSale,
  getSales,
  getSale,
};
