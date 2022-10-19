const Joi = require('joi');
const { actionQuerySchema, colonyNameParams } = require('./common');

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
  getParentSubColonies: {
    ...colonyNameParams,
    ...actionQuerySchema,
  },
  getColonyActions: {
    ...colonyNameParams,
    ...actionQuerySchema,
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
