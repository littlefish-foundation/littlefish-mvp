const actionService = require('../services/action');
const catchAsync = require('../utils/catchAsync');

const getAction = catchAsync(async (req, res) => {
  const { assetName } = req.params;

  const data = await actionService.getAction(assetName);
  res.status(200).send(data);
});

const getActionsFromDatabase = catchAsync(async (req, res) => {
  const {
    filter, sorter, page, limit,
  } = req.query;

  const data = await actionService.getActionsFromDatabase(filter, sorter, page, limit);
  res.status(200).send(data);
});

const getActionsFromBlokchain = catchAsync(async (req, res) => {
  const { cursor, size } = req.query;
  const data = await actionService.getActionsFromBlokchain(cursor, size);
  res.status(200).send(data);
});

const mintAction = catchAsync(async (req, res) => {
  const result = await actionService.mintAction(req.body);
  res.status(201).send(result);
});

module.exports = {
  getAction,
  getActionsFromDatabase,
  getActionsFromBlokchain,
  mintAction,
};
