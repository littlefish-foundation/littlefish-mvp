const UserModel = require('../models/user');

module.exports = class UserDataAccess {
  static async getUserByName(name, fields = '-__v') {
    return UserModel.findOne({ name }).select(fields).lean().exec();
  }

  static async getUsersByColony(colonyID, page, limit, fields = '-__v') {
    return UserModel.find({ colony: colonyID }).skip((page - 1) * limit).limit(limit).select(fields)
      .lean()
      .exec();
  }

  static async updateUserColony(name, colonyId) {
    return UserModel.findOneAndUpdate({ name }, { colony: colonyId });
  }

  static async createUser(user) {
    return UserModel.create(user);
  }

  static async deleteUserByName(name) {
    const { ok } = await UserModel.deleteOne({ name });
    if (ok === 1) {
      return true;
    }
    return false;
  }

  static async getUsers(page, limit, fields = '-__v') {
    return UserModel.find().skip((page - 1) * limit).limit(limit).select(fields)
      .lean()
      .exec();
  }
};
