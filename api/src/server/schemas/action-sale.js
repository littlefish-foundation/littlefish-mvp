const Joi = require('joi');

const actionIdParams = {
  params: Joi.object(
    {
      actionId: Joi.string().required(),
    },
  ),
};

module.exports = {
  getSaleByActionId: {
    ...actionIdParams,
  },

  deleteSaleByActionId: {
    ...actionIdParams,
  },

  updateSaleByActionId: {
    ...actionIdParams,
    body: Joi.object(),
  },

  createActionSale: {
    body: Joi.object(
      {
        price: Joi.number(),
        actionId: Joi.string().required(),
      },
    ),
  },
};
