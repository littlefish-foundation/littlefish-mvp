const Joi = require('joi');

module.exports = {
  login: {
    body: Joi.object(
      {
        assets: Joi.array().items(Joi.object({
          policyID: Joi.string().required(),
          name: Joi.string().required(),
        })).required(),
        walletAddress: Joi.string().required(),
      },
    ),
  },
};
