const actionService = require('../../services/action');
const catchAsync = require('../../utils/catch-async');

module.exports = class ActionController {
  static getAction = catchAsync(async (req, res) => {
    const { id } = req.params;

    const data = await actionService.getActionById(id);
    res.status(200).send(data);
  });

  static deleteAction = catchAsync(async (req, res) => {
    const { id } = req.params;

    const data = await actionService.deleteAction(id);
    res.status(200).send(data);
  });

  static getActions = catchAsync(async (req, res) => {
    const {
      filter, sorter, page, limit,
    } = req.query;

    const data = await actionService.getActions(undefined, filter, sorter, page, limit);
    res.status(200).send(data);
  });

  static mintAction = catchAsync(async (req, res) => {
    const result = await actionService.mintAction(req.body);
    res.status(201).send(result);
  });

  static syncActionStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await actionService.syncActionStatus(id);

    res.status(200).send(result);
  });
};
