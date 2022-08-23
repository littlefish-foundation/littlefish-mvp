const UserModel = require('../models/user');
const { NotFoundError } = require('../errors');

module.exports = class UserDataAccess {
  static async getUser(walletAddress) {
    return UserModel.findOne({ walletAddress }).select('-_id').lean().exec();
  }

  static async createUser(user) {
    await UserModel.create({ user });
  }

  static async deleteUser(user) {
    const { ok } = await UserModel.deleteOne({ user });
    if (ok === 1) {
      return true;
    }
    throw new NotFoundError('User is not found.');
  }

  static async getUsersByColony(colonyId) {
    return UserModel.find({ colony: colonyId }).lean().exec();
  }

  static async updateUserColony(walletAddress, colonyId) {
    return UserModel.findOneAndUpdate({ walletAddress }, { colony: colonyId });
  }
};
