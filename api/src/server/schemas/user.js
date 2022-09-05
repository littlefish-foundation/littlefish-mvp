const Joi = require('joi');

const walletNameParams = {
  params: Joi.object(
    {
      walletAddress: Joi.string().required(),
    },
  ),
};

module.exports = {
  getUser: {
    ...walletNameParams,
  },

  deleteUser: {
    ...walletNameParams,
  },

  getUsersByColony: {
    query: Joi.object({
      colonyName: Joi.string().required(),
      page: Joi.number().integer().default(0),
      limit: Joi.number().integer().positive().default(20),
    }),
  },
  createUser: {
    body: Joi.object(
      {
        name: Joi.string(),
        walletAddress: Joi.string().required(),
        colonyName: Joi.string(),
        avatar: Joi.string().uri(),
      },
    ),
  },

  updateUserColony: {
    ...walletNameParams,
    query: Joi.object(
      {
        colonyName: Joi.string().required(),
      },
    ),
  },
};
