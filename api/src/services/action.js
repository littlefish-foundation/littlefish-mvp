const actionServiceClient = require('./action-client');
const actionDataAccess = require('../data-access/action');
const { prepareAllImageURLsInFile, prepareImageURL, prepareActionToMint } = require('../logics/action');
const { formatActionsFromChain, formatActions } = require('../formatters/action');
const { ApiError, NotFoundError } = require('../errors');

module.exports = class ActionService {
  static async getAction(assetName) {
    const action = await actionDataAccess.getAction(assetName);

    if (!action) {
      throw new NotFoundError('Action is not found.');
    }

    return action;
  }

  static async deleteAction(assetName) {
    const { actionId } = await this.getAction(assetName);

    await actionServiceClient.deleteAction(actionId);

    const success = actionDataAccess.deleteAction(assetName);

    return {
      success,
    };
  }

  static async getActionsFromBlockchain(cursor, size) {
    const response = await actionServiceClient.getActions(cursor, size);

    if (response?.status !== 200) {
      throw new ApiError(response.message, response.status);
    }

    return formatActionsFromChain(response?.data?.data);
  }

  static async getActions(colonyName = undefined, filter = {}, sorter = {}, page = 0, limit = 10) {
    const actions = await actionDataAccess.getActions(colonyName, filter, sorter, page, limit);

    return formatActions(actions);
  }

  static async createActionSale(assetName, price) {
    const action = await actionDataAccess.getAction(assetName);
    await actionServiceClient.createActionSale(action.actionId, price);
  }

  static async mintAction(action) {
    const toMint = prepareActionToMint(action);

    const response = await actionServiceClient.mintAction(toMint);
    const createdAction = response?.data?.data[0];
    const preparedFiles = prepareAllImageURLsInFile(createdAction.files);

    await actionDataAccess.createAction({
      assetName: createdAction.asset_name,
      actionId: createdAction.id,
      name: createdAction.name,
      producer: action.ownerName,
      ownerName: action.ownerName,
      colonyName: action.colonyName,
      fingerprint: createdAction.fingerprint,
      description: action.description,
      mediaType: createdAction.media_type,
      image: prepareImageURL(createdAction.image),
      status: createdAction.status,
      actionType: action.actionType,
      files: preparedFiles,
      nftFormat: createdAction,
      custom_attributes: createdAction.custom_attributes,
      actionCollection: '01g99p2tr5evasrp2kyn25hqwe',
    });

    return {
      success: true,
    };
  }
};
