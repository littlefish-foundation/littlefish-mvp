const Joi = require('joi');
const { colonyNameParams, actionIDQuery } = require('./common');

module.exports = {
  getShowcase: Joi.object({
    ...colonyNameParams,
  }),
  addActionToShowcase: Joi.object({
    ...colonyNameParams,
    ...actionIDQuery,
  }),
  deleteShowcaseByColony: Joi.object({
    ...colonyNameParams,
  }),
  deleteActionFromShowcase: Joi.object({
    ...colonyNameParams,
    ...actionIDQuery,
  }),
};
