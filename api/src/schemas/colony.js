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
      coverImage: Joi.string().base64().required(),
      files: Joi.array(),
      links: Joi.array(),
    },
  ),
};
module.exports = {
  getColony,
  getColonies,
  getColonyActions,
  createColony,
};
