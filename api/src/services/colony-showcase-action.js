const ColonyShowcaseActionDataAccess = require('../data-access/colony-showcase-action');
const ColonyDataAccess = require('../data-access/colony');
const { NotFoundError, BadRequestError } = require('../errors');
const { COLONY_ACTION_SHOWCASE_SIZE_LIMIT } = require('../constants');

module.exports = class ColonyShowcaseActionService {
  static async getColonyIDForShowcase(colonyName) {
    const colony = await ColonyDataAccess.getColonyByName(colonyName);
    if (!colony) {
      throw new NotFoundError(`The colony with name ${colonyName} has not been found.`);
    }
    return colony._id;
  }

  static async getShowcase(colonyName) {
    const colonyID = this.getColonyIDForShowcase(colonyName);
    const showcase = await ColonyShowcaseActionDataAccess.getShowcaseActions(colonyID);

    if (showcase?.length === 0) {
      throw new NotFoundError('Showcase could not be found.');
    }

    return {
      showcase,
    };
  }

  static async addActionToShowcase(colonyName, actionID) {
    const colonyID = await this.getColonyIDForShowcase(colonyName);
    const showcase = await ColonyShowcaseActionDataAccess.getShowcaseActions(colonyID);

    if (showcase?.length >= COLONY_ACTION_SHOWCASE_SIZE_LIMIT) {
      throw new BadRequestError(`Number of actions in the showcase cannot be higher than ${COLONY_ACTION_SHOWCASE_SIZE_LIMIT}.`);
    }

    await ColonyShowcaseActionDataAccess.addActionToShowcase(colonyID, actionID);
  }

  static async deleteShowcaseByColony(colonyName) {
    const colonyID = await this.getColonyIDForShowcase(colonyName);
    await ColonyShowcaseActionDataAccess.deleteShowcaseByColony(colonyID);
  }

  static async deleteActionFromShowcase(colonyName, actionID) {
    const isDeleted = await ColonyShowcaseActionDataAccess.deleteActionFromShowcase(colonyName, actionID);

    if (!isDeleted) {
      throw new BadRequestError('Action to be deleted from the showcase could not be found in the showcase.');
    }
    return {
      success: isDeleted,
    };
  }
};
