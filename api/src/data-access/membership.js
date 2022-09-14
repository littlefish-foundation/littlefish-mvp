const MembershipModel = require('../models/membership');

module.exports = class UserDataAccess {
  static async getMembership(walletAddress, fields = '-__v') {
    return MembershipModel.findOne({ walletAddress }).select(fields).lean().exec();
  }

  static async createMembership(membership) {
    return MembershipModel.create({ membership });
  }
};
