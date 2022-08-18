const actionService = require('./action');
const ColonyModel = require('../models/colony');
const { NotFoundError } = require('../errors');
const s3GeneratePreSignedUrl = require('../utils/s3fileuploader');

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
  // await ColonyModel.create(colony);
  console.log({ colony });

  return {
    success: true,
  };
}

async function prepareFileLinks(files) {
  const promises = [];

  files.forEach((file) => {
    promises.push(s3GeneratePreSignedUrl(file));
  });
  return Promise.all(promises);
}

async function createColonyPreSignedUrls(colony) {
  const links = await prepareFileLinks(colony.files);

  return {
    links,
  };
}

module.exports = {
  getColony,
  getColonies,
  getColonyActions,
  createColony,
  createColonyPreSignedUrls,
};
