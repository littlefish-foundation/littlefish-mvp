const actionSaleService = require('../../services/action-sale');
const catchAsync = require('../../utils/catch-async');

module.exports = class ActionSaleController {
  static getSaleByActionID = catchAsync(async (req, res) => {
    const { actionID } = req.params;
    const { walletAddress } = req.query;

    const data = await actionSaleService.getSaleByActionID(actionID, walletAddress);
    res.status(200).send(data);
  });

  static deleteActionSaleByActionID = catchAsync(async (req, res) => {
    const { actionID } = req.params;

    const data = await actionSaleService.deleteActionSaleByActionID(actionID);
    res.status(200).send(data);
  });

  static createActionSale = catchAsync(async (req, res) => {
    const actionSale = req.body;

    const data = await actionSaleService.createActionSale(actionSale);
    res.status(201).send(data);
  });

  static updateActionSaleByActionID = catchAsync(async (req, res) => {
    const { actionID } = req.params;
    const actionSale = req.body;

    const result = await actionSaleService.updateActionSaleByActionID(actionID, actionSale);
    res.status(200).send(result);
  });
};
