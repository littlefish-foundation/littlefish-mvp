const actionCategoryService = require('../../services/action-category');
const catchAsync = require('../../utils/catch-async');

module.exports = class ActionCategoryController {
  static getActionCategory = catchAsync(async (req, res) => {
    const { name } = req.params;

    const data = await actionCategoryService.getActionCategory(name);
    res.status(200).send(data);
  });

  static deleteActionCategory = catchAsync(async (req, res) => {
    const { name } = req.params;

    const result = await actionCategoryService.deleteActionCategory(name);
    res.status(200).send(result);
  });

  static createActionCategory = catchAsync(async (req, res) => {
    const actionCategory = req.body;

    const result = await actionCategoryService.createActionCategory(actionCategory);
    res.status(201).send(result);
  });

  static getActionCategories = catchAsync(async (req, res) => {
    const { page, limit } = req.query;

    const data = await actionCategoryService.getActionCategories(page, limit);
    res.status(200).send(data);
  });
};
