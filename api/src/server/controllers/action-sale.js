const actionSaleService = require('../../services/action-sale');
const catchAsync = require('../../utils/catch-async');

module.exports = class ActionSaleController {
  static getSaleByActionId = catchAsync(async (req, res) => {
    const { actionId } = req.params;

    const data = await actionSaleService.getSaleByActionId(actionId);
    res.status(200).send(data);
  });

  static deleteActionSaleByActionId = catchAsync(async (req, res) => {
    const { actionId } = req.params;

    const data = await actionSaleService.deleteActionSaleByActionId(actionId);
    res.status(200).send(data);
  });

  static createActionSale = catchAsync(async (req, res) => {
    const actionSale = req.query;

    const data = await actionSaleService.createActionSale(actionSale);
    res.status(201).send(data);
  });

  static updateActionSaleByActionId = catchAsync(async (req, res) => {
    const { actionId } = req.params;
    const actionSale = req.body;

    const result = await actionSaleService.updateActionSaleByActionId(actionId, actionSale);
    res.status(200).send(result);
  });
};
