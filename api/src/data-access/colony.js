const ColonyModel = require('../models/colony');

module.exports = class ColonyDataAccess {
  static async getColonyByName(name, fields = '-__v') {
    return ColonyModel.findOne({ name }).select(fields).lean().exec();
  }

  static async createColony(colony) {
    return ColonyModel.create(colony);
  }

  static async deleteColonyByName(name) {
    const { ok } = await ColonyModel.deleteOne({ name });
    return ok === 1;
  }

  static async getColonies(page, limit, fields = '-__v') {
    return ColonyModel.find().skip(page * limit).select(fields).limit(limit)
      .lean()
      .exec();
  }
};
