const actionTypeService = require('../../services/action-type');
const catchAsync = require('../../utils/catch-async');

module.exports = class ActionTypeController {
  static getActionType = catchAsync(async (req, res) => {
    const { name } = req.params;

    const data = await actionTypeService.getActionType(name);
    res.status(200).send(data);
  });

  static deleteActionType = catchAsync(async (req, res) => {
    const { name } = req.params;

    const result = await actionTypeService.deleteActionType(name);
    res.status(200).send(result);
  });

  static createActionType = catchAsync(async (req, res) => {
    const actionType = req.query;

    const result = await actionTypeService.createActionType(actionType);
    res.status(201).send(result);
  });

  static getActionTypes = catchAsync(async (req, res) => {
    const { page, limit } = req.query;

    const data = await actionTypeService.getActionTypes(page, limit);
    res.status(200).send(data);
  });

  static getPopularActionTypes = catchAsync(async (req, res) => {
    const { limit } = req.query;

    const data = await actionTypeService.getPopularActionTypes(limit);
    res.status(200).send(data);
  });
};
