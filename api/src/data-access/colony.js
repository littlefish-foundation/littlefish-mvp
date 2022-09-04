const ColonyModel = require('../models/colony');

module.exports = class ColonyDataAccess {
  static async getColonyByName(name) {
    return ColonyModel.findOne({ name }).lean().exec();
  }

  static async createColony(colony) {
    // TODO resp
    return ColonyModel.create(colony);
  }

  static async deleteColonyByName(name) {
    const { ok } = await ColonyModel.deleteOne({ name });
    if (ok === 1) {
      return true;
    }
    return false;
  }

  static async getColonies(page, limit) {
    return ColonyModel.find().skip(page * limit).limit(limit)
      .lean()
      .exec();
  }
};
