const Joi = require('joi');

const nameParams = {
  params: Joi.object(
    {
      name: Joi.string().required(),
    },
  ),
};

module.exports = {
  getUser: {
    ...nameParams,
  },

  deleteUser: {
    ...nameParams,
  },

  getUsersByColony: {
    query: Joi.object({
      colonyName: Joi.string().required(),
      page: Joi.number().integer().default(1),
      limit: Joi.number().integer().positive().default(20),
    }),
  },
  createUser: {
    body: Joi.object(
      {
        name: Joi.string().required(),
        walletAddress: Joi.string().required(),
        colonyName: Joi.string().required(),
        avatar: Joi.string().required(),
        bio: Joi.string(),
      },
    ),
  },

  updateUserColony: {
    ...nameParams,
    query: Joi.object(
      {
        colonyName: Joi.string().required(),
      },
    ),
  },
};
