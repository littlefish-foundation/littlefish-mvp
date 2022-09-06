const ActionSaleModel = require('../models/colony');

module.exports = class ActionSaleAccess {
  static async getSaleByActionId(actionId, fields = '-__v') {
    return ActionSaleModel.findOne({ actionId }).select(fields).lean().exec();
  }

  static async createActionSale(sale) {
    // TODO resp
    return ActionSaleModel.create(sale);
  }

  static async deleteActionSaleByActionId(actionId) {
    const { ok } = await ActionSaleModel.deleteOne({ actionId });
    if (ok === 1) {
      return true;
    }
    return false;
  }

  static async updateActionSaleByActionId(actionId, updates) {
    // TODO resp
    await ActionSaleModel.findOneAndUpdate({ actionId }, updates);
  }
};
