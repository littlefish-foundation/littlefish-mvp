const ActionSaleModel = require('../models/action-sale');

module.exports = class ActionSaleAccess {
  static async getSaleByActionID(actionID, fields = '-__v') {
    return ActionSaleModel.findOne({ action: actionID }).select(fields).lean().exec();
  }

  static async setLastAccessed(actionID, walletAddress) {
    await ActionSaleModel.findOneAndUpdate({ action: actionID }, {
      lastAccessed: Date.now(),
      lastAccessedWallet: walletAddress,
    });
  }

  static async createActionSale(sale) {
    return ActionSaleModel.create({
      ...sale,
      lastAccessed: Date.now() - 20 * 60 * 1000,
      lastAccessedWallet: undefined,
    });
  }

  static async deleteActionSaleByActionID(actionID) {
    const { ok } = await ActionSaleModel.deleteOne({ action: actionID });
    return ok === 1;
  }

  static async updateActionSaleByActionID(actionID, updates) {
    // TODO resp
    await ActionSaleModel.findOneAndUpdate({ action: actionID }, updates);
  }
};
