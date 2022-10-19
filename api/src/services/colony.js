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

  static async getParentSubColonies(colonyName, filter, sorter, page, limit) {
    const colony = await colonyDataAccess.getColonyByName(colonyName);

    const promises = [];
    promises.push(colonyRelationDataAccess.getSubColonies(colony._id));
    promises.push(colonyRelationDataAccess.getParentColony(colony._id));
    const [subs, parent] = await Promise.all(promises);

    if (parent) {
      parent.actions = await this.getColonyActions(parent.name, filter, sorter, page, limit);
    }

    const subActionPromises = [];
    subs?.forEach((sub) => {
      subActionPromises.push(this.getColonyActions(sub.name, filter, sorter, page, limit));
    });

    const allSubActions = await Promise.all(subActionPromises);
    allSubActions?.forEach((subActions, i) => {
      if (subs[i] && subActions) subs[i].actions = subActions;
    });

    return {
      subs,
      parent,
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
