const ColonyRelationModel = require('../models/colony-relation');

module.exports = class ColonyRelationDataAccess {
  static async createColonyRelation(parent, sub) {
    return ColonyRelationModel.create({ parent, sub });
  }

  static async getSubColonies(parent) {
    return ColonyRelationModel.find({ parent }).populate('sub', '_id name description coverImage').lean().exec();
  }

  static async getParentColony(sub) {
    return ColonyRelationModel.findOne({ sub }).populate('parent', 'name description coverImage').lean().exec();
  }

  static async deleteColonyRelation(parent, sub) {
    return ColonyRelationModel.deleteOne({ parent, sub }).exec();
  }

  static async deleteAllByParent(parent) {
    return ColonyRelationModel.deleteMany({ parent }).exec();
  }

  static async deleteBySub(sub) {
    return ColonyRelationModel.deleteOne({ sub }).exec();
  }
};
