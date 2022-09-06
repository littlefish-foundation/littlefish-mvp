const ActionTypeModel = require('../models/action-type');

module.exports = class ActionTypeAccess {
  static async getActionType(name, fields = '-__v') {
    return ActionTypeModel.findOne({ name }).select(fields).lean().exec();
  }

  static async getPopularActionTypes(limit, fields = '-_id, -__v') {
    return ActionTypeModel.find().sort({ count: 'desc' }).limit(limit).select(fields)
      .lean()
      .exec();
  }

  static async getActionTypes(page, limit, fields = '-__v') {
    return ActionTypeModel.find().skip(page * limit).limit(limit).select(fields)
      .lean()
      .exec();
  }

  static async createActionType(name) {
    return ActionTypeModel.create({
      name,
      count: 1,
    });
  }

  static async deleteActionType(name) {
    const { ok } = await ActionTypeModel.deleteOne({ name });
    if (ok === 1) {
      return true;
    }
    return false;
  }

  static async incrementActionType(name) {
    ActionTypeModel.findOneAndUpdate({ name }, { count: { $inc: 1 } });
  }
};
