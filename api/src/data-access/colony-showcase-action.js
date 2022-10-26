const ColonyShowcaseActionModel = require('../models/colony-showcase-action');

module.exports = class ColonyShowcaseActionDataAccess {
  static async getShowcaseActions(colony) {
    return ColonyShowcaseActionModel.find({ colony }).populate('action').lean().exec();
  }

  static async addActionToShowcase(colony, action) {
    return ColonyShowcaseActionModel.create({
      action,
      colony,
    });
  }

  static async deleteShowcaseByColony(colony) {
    return ColonyShowcaseActionModel.deleteMany({
      colony,
    });
  }

  static async deleteActionFromShowcase(colonyName, action) {
    const { deletedCount } = await ColonyShowcaseActionModel.deleteOne({
      colonyName,
      action,
    });
    return deletedCount === 1;
  }
};
