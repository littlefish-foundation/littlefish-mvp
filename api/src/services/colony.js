const actionService = require('./action');
const ColonyModel = require('../models/colony');
const { NotFoundError } = require('../errors');

async function getColony(colonyName) {
  const colony = await ColonyModel.findOne({ colonyName }).select('-_id').lean().exec();

  if (!colony) {
    throw new NotFoundError('Colony is not found.');
  }

  return colony;
}

async function getColonies(page, limit) {
  const colony = await ColonyModel.find().skip(page * limit).limit(limit).select('-_id')
    .lean()
    .exec();

  if (!colony) {
    throw new NotFoundError('Colony is not found.');
  }

  return colony;
}

async function getColonyActions(colonyName, filter = {}, sorter = {}, page = 0, limit = 10) {
  return actionService.getActions(colonyName, filter, sorter, page, limit);
}

async function createColony(colony) {
  await ColonyModel.create(colony);

  return {
    success: true,
  };
}

module.exports = {
  getColony,
  getColonies,
  getColonyActions,
  createColony,
};
