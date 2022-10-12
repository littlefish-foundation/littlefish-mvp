const ActionModel = require('../models/action');

module.exports = class ActionDataAccess {
  static async getActionByBlockchainId(chainID, fields = '-__v') {
    return ActionModel.findOne({ chainID }).select(fields).lean().exec();
  }

  static async getActionById(id, fields = '-__v') {
    return ActionModel.findById(id).select(fields).lean().exec();
  }

  static async createAction(action) {
    return ActionModel.create(action);
  }

  static async deleteActionById(id) {
    const { ok } = await ActionModel.findByIdAndDelete(id);
    return ok === 1;
  }

  static async syncActionStatus(id, status) {
    return ActionModel.findByIdAndUpdate(id, { status });
  }

  static async getActions(colony, filter, sorter, page, limit, fields = '-__v') {
    const {
      name, producerName, minDate, maxDate, status, type,
    } = filter;

    const {
      sortingField, sortingOrder,
    } = sorter;

    return ActionModel.find({
      ...(colony ? { colony } : undefined),
      ...(minDate ? { createdAt: { $gte: minDate } } : undefined),
      ...(maxDate ? { createdAt: { $lte: maxDate } } : undefined),
      ...(producerName ? { producerName: { $regex: producerName, $options: 'i' } } : undefined),
      ...(type ? { types: type } : undefined),
      ...(name ? { name: { $regex: name, $options: 'i' } } : undefined),
      ...(status ? { status } : undefined),
    }).skip(page * limit).limit(limit)
      .sort({
        ...(sortingField ? { sortingField: sortingOrder } : undefined),
      })
      .select(fields)
      .lean()
      .exec();
  }
};
