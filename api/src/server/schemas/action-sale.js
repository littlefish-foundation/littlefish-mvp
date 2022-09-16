const Joi = require('joi');

const actionIDParams = {
  params: Joi.object(
    {
      actionID: Joi.string().required(),
    },
  ),
};

module.exports = {
  getSaleByActionID: {
    ...actionIDParams,
  },

  deleteSaleByActionID: {
    ...actionIDParams,
  },

  updateSaleByActionID: {
    ...actionIDParams,
    body: Joi.object(),
  },

  createActionSale: {
    body: Joi.object(
      {
        price: Joi.number(),
        actionID: Joi.string().required(),
      },
    ),
  },
};
