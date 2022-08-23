const userDataAccess = require('../data-access/user');
const colonyDataAccess = require('../data-access/colony');
const { NotFoundError } = require('../errors');

module.exports = class UserService {
  static async getUser(walletAddress) {
    const user = await userDataAccess.getUser(walletAddress);

    if (!user) {
      throw new NotFoundError('User is not found.');
    }
    return user;
  }

  static async deleteUser(walletAddress) {
    const success = await userDataAccess.deleteUser(walletAddress);

    return {
      success,
    };
  }

  static async createUser(user) {
    const colony = await colonyDataAccess.getColony(user.colonyName);

    await userDataAccess.createUser({
      ...user,
      colony: colony._id,
    });

    return {
      success: true,
    };
  }

  static async updateUserColony(walletAddress, colonyName) {
    const [colony, user] = await Promise.all(
      [colonyDataAccess.getColony(colonyName),
        userDataAccess.getUser(walletAddress)],
    );

    if (user) {
      await userDataAccess.updateUserColony(walletAddress, colony._id);
    } else {
      await this.createUser({ walletAddress, colony: colony._id });
    }

    return {
      success: true,
    };
  }
};
