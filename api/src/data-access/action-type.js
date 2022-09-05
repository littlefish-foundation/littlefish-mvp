const ActionTypeModel = require('../models/colony');

module.exports = class ActionTypeAccess {
  static async getActionType(name) {
    return ActionTypeModel.findOne({ name }).lean().exec();
  }

  static async getActionTypes(page, limit) {
    return ActionTypeModel.find().skip(page * limit).limit(limit)
      .lean()
      .exec();
  }

  static async createActionType(type) {
    // TODO resp

    return ActionTypeModel.create({
      ...type,
      count: 0,
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
