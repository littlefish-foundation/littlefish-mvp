const ActionModel = require('../models/action');

module.exports = class ActionDataAccess {
  static async getActionByBlockchainId(chainID) {
    return ActionModel.findOne({ chainID }).lean().exec();
  }

  static async getActionById(id) {
    return ActionModel.findById(id).lean().exec();
  }

  static async createAction(action) {
    // TODO RESPONSE OF CREATE ACTION
    return ActionModel.create(action);
  }

  static async deleteActionById(id) {
    const { ok } = await ActionModel.findByIdAndDelete(id);
    if (ok === 1) {
      return true;
    }
    return false;
  }

  static async syncActionStatus(id, status) {
    // TODO response
    return ActionModel.findByIdAndUpdate(id, { status });
  }

  static async getActions(colony, filter, sorter, page, limit) {
    const {
      assetName, ownerName, minDate, maxDate, status,
    } = filter;

    const {
      sortingField, sortingOrder,
    } = sorter;

    return ActionModel.find({
      ...(colony ? { colony } : undefined),
      ...(minDate ? { createdAt: { $gte: minDate } } : undefined),
      ...(maxDate ? { createdAt: { $lte: maxDate } } : undefined),
      ...(ownerName ? { ownerName } : undefined),
      ...(assetName ? { assetName: { $regex: assetName, $options: 'i' } } : undefined),
      ...(status ? { status } : undefined),
    })
      .skip(page * limit).limit(limit)
      .sort({
        ...(sortingField ? { sortingField: sortingOrder } : undefined),
      })
      .lean()
      .exec();
  }
};
