const Joi = require('joi');

const nameParams = {
  params: Joi.object(
    {
      name: Joi.string().required(),
    },
  ),
};

module.exports = {
  getActionType: {
    ...nameParams,
  },

  getActionTypes: {
    query: Joi.object({
      page: Joi.number().integer().default(0),
      limit: Joi.number().integer().positive().default(20),
    }),
  },

  createActionType: {
    query: Joi.object(
      {
        name: Joi.string().required(),
      },
    ),
  },

  deleteActionType: {
    ...nameParams,
  },
};
