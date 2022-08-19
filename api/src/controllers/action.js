const actionService = require('../services/action');
const catchAsync = require('../utils/catch-async');

module.exports = class ActionController {
  static getAction = catchAsync(async (req, res) => {
    const { assetName } = req.params;

    const data = await actionService.getAction(assetName);
    res.status(200).send(data);
  });

  static deleteAction = catchAsync(async (req, res) => {
    const { assetName } = req.params;

    const data = await actionService.deleteAction(assetName);
    res.status(200).send(data);
  });

  static getActions = catchAsync(async (req, res) => {
    const {
      filter, sorter, page, limit,
    } = req.query;

    const data = await actionService.getActions(undefined, filter, sorter, page, limit);
    res.status(200).send(data);
  });

  static getActionsFromBlockchain = catchAsync(async (req, res) => {
    const { cursor, size } = req.query;
    const data = await actionService.getActionsFromBlockchain(cursor, size);
    res.status(200).send(data);
  });

  static mintAction = catchAsync(async (req, res) => {
    const result = await actionService.mintAction(req.body);
    res.status(201).send(result);
  });
};
