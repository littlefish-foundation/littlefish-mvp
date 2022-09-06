const Joi = require('joi');

const colonyNameParams = {
  params: Joi.object(
    {
      colonyName: Joi.string().required(),
    },
  ),
};

module.exports = {
  getColony: {
    ...colonyNameParams,
  },

  deleteColony: {
    ...colonyNameParams,
  },

  getColonies: {
    query: Joi.object(
      {
        page: Joi.number().integer().default(0),
        limit: Joi.number().integer().positive().default(20),
      },
    ),
  },

  getColonyActions: {
    ...colonyNameParams,
    query: Joi.object(
      {
        filter: Joi.object().default({}),
        sorter: Joi.object().default({}),
        page: Joi.number().integer().default(0),
        limit: Joi.number().integer().positive().default(20),
      },
    ),
  },
  createColony: {
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
  },
};