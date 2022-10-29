const ColonyActionTypeModel = require('../models/colony-action-type');

module.exports = class ColonyActionTypeDataAccess {
  static async getColonyActionType( colony, name, fields = '-__v') {
    return ColonyActionTypeModel.findOne({ colony, name }).select(fields).lean().exec();
  }

  static async getPopularColonyActionTypes(colony, limit=10, fields = '-_id, -__v') {
    return ColonyActionTypeModel.find({ colony }).sort({ count: 'desc' }).limit(limit).select(fields)
      .lean()
      .exec();
  }

  static async getColonyActionTypes(colony, page=0, limit=10, fields = '-__v') {
    return ColonyActionTypeModel.find({ colony }).skip(page * limit).limit(limit).select(fields)
      .lean()
      .exec();
  }

  static async createColonyActionType( colony, name ) {
    return ColonyActionTypeModel.create({
      name,
      colony,
      count: 1,
    });
  }

  static async deleteColonyActionType( colony, name ) {
    const { ok } = await ColonyActionTypeModel.deleteOne({ colony, name });
    return ok === 1;
  }

  static async incrementColonyActionType( colony, name ) {
    ColonyActionTypeModel.findOneAndUpdate({ colony, name }, { count: { $inc: 1 } });
  }
};
