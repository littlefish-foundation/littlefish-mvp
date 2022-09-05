const actionTypeDataAccess = require('../data-access/action-type');
const { NotFoundError } = require('../errors');

module.exports = class ActionTypeService {
  static async getActionType(name) {
    const actionType = await actionTypeDataAccess.getActionType(name);

    if (!actionType) {
      throw new NotFoundError(`Category for name: ${name} is not found.`);
    }
    return actionType;
  }

  static async deleteActionType(name) {
    const success = await actionTypeDataAccess.deleteActionType(name);

    return {
      success,
    };
  }

  static async createActionType(actionType) {
    // TODO createActionType response
    await actionTypeDataAccess.createActionType(actionType);

    return {
      success: true,
    };
  }

  static async getActionTypes(page, limit) {
    // TODO resp
    const actionTypes = await actionTypeDataAccess.getActionTypes(page, limit);

    return {
      actionTypes,
    };
  }
};
