const userDataAccess = require('../data-access/user');
const colonyDataAccess = require('../data-access/colony');
const { NotFoundError } = require('../errors');

module.exports = class UserService {
  static async getUserByName(name) {
    const user = await userDataAccess.getUserByName(name);

    if (!user) {
      throw new NotFoundError(`User with name: ${name} not found.`);
    }
    return user;
  }

  static async deleteUserByName(name) {
    const success = await userDataAccess.deleteUserByName(name);

    return {
      success,
    };
  }

  static async getUsersByColony(colonyName, page, limit) {
    const colony = await colonyDataAccess.getColonyByName(colonyName);

    const users = await userDataAccess.getUsersByColony(colony._id, page, limit);

    return {
      users,
    };
  }

  static async createUser(user) {
    const colony = await colonyDataAccess.getColonyByName(user.colonyName);
    if (!colony) {
      throw new NotFoundError(`Colony with name:${user.colonyName} is not found.`);
    }
    const userWithColony = {
      ...user,
      colony: colony._id,
    };
    await userDataAccess.createUser(userWithColony);

    return {
      success: true,
    };
  }

  static async updateUserColony(name, colonyName) {
    const colony = colonyDataAccess.getColonyByName(colonyName);

    if (!colony) {
      throw new NotFoundError(`Colony with name:${colonyName} is not found.`);
    }
    // TODO findOneAndUpdate response if fails throw exception
    await userDataAccess.updateUserColony(name, colony._id);

    return {
      success: true,
    };
  }
};
