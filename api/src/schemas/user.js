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
