const userDataAccess = require('../data-access/user');
const colonyDataAccess = require('../data-access/colony');
const { NotFoundError } = require('../errors');

module.exports = class UserService {
  static async getUserByWalletAddress(walletAddress) {
    const user = await userDataAccess.getUserByWalletAddress(walletAddress);

    if (!user) {
      throw new NotFoundError(`User with wallet address: ${walletAddress} not found.`);
    }
    return user;
  }

  static async deleteUserByWalletAddress(walletAddress) {
    const success = await userDataAccess.deleteUserByWalletName(walletAddress);

    return {
      success,
    };
  }

  static async getUsersByColony(colonyName) {
    const users = await userDataAccess.getUsersByColony(colonyName);

    return {
      users,
    };
  }

  static async createUser(user) {
    const colony = await colonyDataAccess.getColonyByName(user.colonyName);
    if (!colony) {
      throw new NotFoundError(`Colony with name:${user.colonyName} is not found.`);
    }
    // TODO createUser response
    await userDataAccess.createUser({
      ...user,
      colony: colony._id,
    });

    return {
      success: true,
    };
  }

  static async updateUserColony(walletAddress, colonyName) {
    const colony = colonyDataAccess.getColonyByName(colonyName);

    if (!colony) {
      throw new NotFoundError(`Colony with name:${colonyName} is not found.`);
    }
    // TODO findOneAndUpdate response if fails throw exception
    await userDataAccess.updateUserColony(walletAddress, colony._id);

    return {
      success: true,
    };
  }
};
