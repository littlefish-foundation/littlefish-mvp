const colonyService = require('../services/colony');
const catchAsync = require('../utils/catch-async');

const getColony = catchAsync(async (req, res) => {
  const { colonyName } = req.params;

  const data = await colonyService.getColony(colonyName);
  res.status(200).send(data);
});

const getColonies = catchAsync(async (req, res) => {
  const {
    page, limit,
  } = req.query;

  const data = await colonyService.getColonies(page, limit);
  res.status(200).send(data);
});

const getColonyActions = catchAsync(async (req, res) => {
  const {
    colonyName,
  } = req.params;

  const {
    filter, sorter, page, limit,
  } = req.query;

  const data = await colonyService.getColonyActions(colonyName, filter, sorter, page, limit);
  res.status(200).send(data);
});

const createColony = catchAsync(async (req, res) => {
  const {
    colony,
  } = req.body;

  const data = await colonyService.createColony(colony);

  res.status(201).send(data);
});

const createColonyPreSignedUrls = catchAsync(async (req, res) => {
  const {
    files,
  } = req.body;

  const data = await colonyService.createColonyPreSignedUrls(files);

  res.status(200).send(data);
});

module.exports = {
  getColony,
  getColonies,
  getColonyActions,
  createColony,
  createColonyPreSignedUrls,
};
