const Joi = require('joi');

const nameParams = {
  params: Joi.object(
    {
      name: Joi.string().required(),
    },
  ),
};

module.exports = {
  getActionCategory: {
    ...nameParams,
  },

  getActionCategories: {
    query: Joi.object({
      page: Joi.number().integer().default(0),
      limit: Joi.number().integer().positive().default(20),
    }),
  },

  createActionCategory: {
    body: Joi.object(
      {
        name: Joi.string().required(),
      },
    ),
  },

  deleteActionCategory: {
    ...nameParams,
  },
};
