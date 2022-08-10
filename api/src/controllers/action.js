const actionService = require('../services/action');
const catchAsync = require('../utils/catchAsync');

const getActionsFromDatabase = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const data = await actionService.getActionsFromDatabase(page, limit);
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
  getActionsFromDatabase,
  getActionsFromBlokchain,
  mintAction,
};
