const actionService = require('./action');
const colonyDataAccess = require('../data-access/colony');
const colonyRelationDataAccess = require('../data-access/colony-relation');
const { NotFoundError } = require('../errors');

module.exports = class ColonyService {
  static async getColony(name) {
    const colony = await colonyDataAccess.getColonyByName(name);
    if (!colony) {
      throw new NotFoundError(`The colony with name: ${name} is not found.`);
    }
    const promises = [];
    promises.push(colonyRelationDataAccess.getSubColonies(colony._id));
    promises.push(colonyRelationDataAccess.getParentColony(colony._id));
    const [subs, parent] = await Promise.all(promises);

    colony.subs = subs;
    colony.parent = parent;

    return colony;
  }

  static async deleteColony(name) {
    const colony = await colonyDataAccess.getColonyByName(name);
    if (!colony) {
      throw new NotFoundError(`The colony with name: ${name} is not found.`);
    }

    await Promise.all([
      colonyRelationDataAccess.deleteBySub(colony._id),
      colonyRelationDataAccess.deleteAllByParent(colony._id),
    ]);

    const success = await colonyDataAccess.deleteColonyByName(name);

    return {
      success,
    };
  }

  static async getAllInfo(colonyName, filter, sorter, page, limit) {
    const colony = await this.getColony(colonyName);
    colony.actions = await actionService.getActions(colonyName, filter, sorter, page, limit);

    const subActionPromises = [];
    colony.subs?.forEach((sub) => {
      subActionPromises.push(this.getColonyActions(sub.name, filter, sorter, page, limit));
    });

    const allSubActions = await Promise.all(subActionPromises);
    allSubActions?.forEach((subActions, i) => {
      if (colony.subs[i] && subActions) colony.subs[i].actions = subActions;
    });

    return colony;
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
