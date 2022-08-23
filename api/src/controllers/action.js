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

  static createActionSale = catchAsync(async (req, res) => {
    const { price } = req.query;
    const { assetName } = req.params;

    const data = await actionService.createActionSale(assetName, price);
    res.status(201).send(data);
  });

  static getSale = catchAsync(async (req, res) => {
    const { assetName } = req.params;

    const data = await actionService.getSale(assetName);
    res.status(200).send(data);
  });

  static getActionsFromBlockchain = catchAsync(async (req, res) => {
    const { cursor, size } = req.query;
    const data = await actionService.getActionsFromBlockchain(cursor, size);
    res.status(200).send(data);
  });

  static getSales = catchAsync(async (req, res) => {
    const { size } = req.query;
    const data = await actionService.getSales(size);
    res.status(200).send(data);
  });

  static mintAction = catchAsync(async (req, res) => {
    const result = await actionService.mintAction(req.body);
    res.status(201).send(result);
  });

  static createActionCollection = catchAsync(async (req, res) => {
    const { walletAddress, assetName } = req.body;
    const result = await actionService.createActionCollection(walletAddress, assetName);
    res.status(201).send(result);
  });
};
