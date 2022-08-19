const ColonyModel = require('../models/colony');
const { NotFoundError } = require('../errors');

module.exports = class ColonyService {
  static async getColony(colonyName) {
    const colony = await ColonyModel.findOne({ colonyName }).lean().exec();

    if (!colony) {
      throw new NotFoundError('Colony is not found.');
    }

    return colony;
  }

  static async createColony(colony) {
    await ColonyModel.create(colony);
  }

  static async deleteColony(colonyName) {
    const { ok } = await ColonyModel.deleteOne({ colonyName });
    if (ok === 1) {
      return true;
    }
    throw new NotFoundError('Colony is not found.');
  }

  static async getColonies(colonyName, filter, sorter, page, limit) {
    return ColonyModel.find().skip(page * limit).limit(limit).select('-_id')
      .lean()
      .exec();
  }
};
