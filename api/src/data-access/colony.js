const ColonyModel = require('../models/colony');
const { NotFoundError } = require('../errors');

module.exports = class ColonyDataAccess {
  static async getColony(name) {
    const colony = await ColonyModel.findOne({ name }).lean().exec();

    if (!colony) {
      throw new NotFoundError('Colony is not found.');
    }

    return colony;
  }

  static async createColony(colony) {
    await ColonyModel.create(colony);
  }

  static async deleteColony(name) {
    const { ok } = await ColonyModel.deleteOne({ name });
    if (ok === 1) {
      return true;
    }
    throw new NotFoundError('Colony is not found.');
  }

  static async getColonies(page, limit) {
    return ColonyModel.find().skip(page * limit).limit(limit).select('-_id')
      .lean()
      .exec();
  }
};
