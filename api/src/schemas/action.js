const Joi = require('joi');
const { ACTION_MAX_ALLOWED_LENGTH } = require('../constants');

const getActionsFromBlokchain = Joi.object(
  {
    cursor: Joi.string(),
    size: Joi.number().integer().positive(),
  },
);

const getActionsFromDatabase = Joi.object(
  {
    page: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
  },
);

const mintAction = Joi.object(
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
  },
);

module.exports = {
  getActionsFromBlokchain,
  getActionsFromDatabase,
  mintAction,
};
