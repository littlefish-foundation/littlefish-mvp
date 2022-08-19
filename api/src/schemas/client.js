const Joi = require('joi');

const walletNameParams = {
  params: Joi.object(
    {
      walletAddress: Joi.string().required(),
    },
  ),
};
const getClient = {
  ...walletNameParams,
};

const deleteClient = {
  ...walletNameParams,
};

const createClient = {
  body: Joi.object(
    {
      name: Joi.string(),
      walletAddress: Joi.string().required(),
      colonyName: Joi.string().required(),
    },
  ),
};

module.exports = {
  getClient,
  deleteClient,
  createClient,
};
