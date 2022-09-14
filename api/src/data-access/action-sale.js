const ActionSaleModel = require('../models/action-sale');

module.exports = class ActionSaleAccess {
  static async getSaleByActionID(actionID, fields = '-__v') {
    return ActionSaleModel.findOne({ actionID }).select(fields).lean().exec();
  }

  static async createActionSale(sale) {
    // TODO resp
    return ActionSaleModel.create(sale);
  }

  static async deleteActionSaleByActionID(actionID) {
    const { ok } = await ActionSaleModel.deleteOne({ actionID });
    if (ok === 1) {
      return true;
    }
    return false;
  }

  static async updateActionSaleByActionID(actionID, updates) {
    // TODO resp
    await ActionSaleModel.findOneAndUpdate({ actionID }, updates);
  }
};
