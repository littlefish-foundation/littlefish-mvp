const UserModel = require('../models/user');

module.exports = class UserDataAccess {
  static async getUserByWalletAddress(walletAddress) {
    return UserModel.findOne({ walletAddress }).lean().exec();
  }

  static async getUsersByColony(colonyId, page, limit) {
    return UserModel.find({ colony: colonyId }).skip(page * limit).limit(limit)
      .lean()
      .exec();
  }

  static async updateUserColony(walletAddress, colonyId) {
    return UserModel.findOneAndUpdate({ walletAddress }, { colony: colonyId });
  }

  static async createUser(user) {
    // TODO Resp
    return UserModel.create({ user });
  }

  static async deleteUserByWalletName(walletAddress) {
    const { ok } = await UserModel.deleteOne({ walletAddress });
    if (ok === 1) {
      return true;
    }
    return false;
  }
};
