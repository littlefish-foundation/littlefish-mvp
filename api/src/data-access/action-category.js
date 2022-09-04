const ActionCategoryModel = require('../models/colony');

module.exports = class ActionCategoryAccess {
  static async getActionCategory(name) {
    return ActionCategoryModel.findOne({ name }).lean().exec();
  }

  static async getActionCategories(page, limit) {
    return ActionCategoryModel.find().skip(page * limit).limit(limit)
      .lean()
      .exec();
  }

  static async createActionCategory(category) {
    // TODO resp
    return ActionCategoryModel.create(category);
  }

  static async deleteCategory(name) {
    const { ok } = await ActionCategoryModel.deleteOne({ name });
    if (ok === 1) {
      return true;
    }
    return false;
  }
};
