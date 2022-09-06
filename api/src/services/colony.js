const actionService = require('./action');
const userDataAccess = require('../data-access/user');
const colonyDataAccess = require('../data-access/colony');
const { NotFoundError } = require('../errors');

module.exports = class ColonyService {
  static async getColony(name) {
    const colony = await colonyDataAccess.getColonyByName(name);
    if (!colony) {
      throw new NotFoundError(`The colony with name: ${name} is not found.`);
    }

    const colonyMembers = await userDataAccess.getUsersByColony(colony._id);
    colony.members = colonyMembers;

    return colony;
  }

  static async deleteColony(name) {
    const success = await colonyDataAccess.deleteColonyByName(name);

    return {
      success,
    };
  }

  static async getColonies(page, limit) {
    return colonyDataAccess.getColonies(page, limit);
  }

  static async getColonyActions(colonyName, filter, sorter, page, limit) {
    return actionService.getActions(colonyName, filter, sorter, page, limit);
  }

  static async createColony(colony) {
    await colonyDataAccess.createColony(colony);

    return {
      success: true,
    };
  }
};
