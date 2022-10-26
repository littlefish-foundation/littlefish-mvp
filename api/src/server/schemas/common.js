const Joi = require('joi');

module.exports = {
  idParams: {
    params: Joi.object(
      {
        id: Joi.string().required(),
      },
    ),
  },

  actionQuerySchema: {
    query: Joi.object(
      {
        name: Joi.string(),
        producerName: Joi.string(),
        status: Joi.string(),
        type: Joi.string(),
        minDate: Joi.date(),
        maxDate: Joi.date(),
        sortingOrder: Joi.string().valid('asc', 'desc').default('desc'),
        sortingField: Joi.string(),
        page: Joi.number().integer().default(0),
        limit: Joi.number().integer().positive().default(20),
      },
    ),
  },
  colonyNameParams: {
    params: Joi.object(
      {
        colonyName: Joi.string().required(),
      },
    ),
  },
  actionIDQuery: {
    query: Joi.object({
      actionID: Joi.string().required(),
    }),
  },

};
