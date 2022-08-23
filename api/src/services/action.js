const actionServiceClient = require('./action-client');
const actionDataAccess = require('../data-access/action');
const colonyDataAccess = require('../data-access/colony');
const { prepareAllImageURLsInFile, prepareImageURL, prepareActionToMint } = require('../logics/action');
const { formatActionsFromChain, formatActions } = require('../formatters/action');
const { ApiError, NotFoundError } = require('../errors');
const { ADA_TO_LOVELACE_CONVERSION } = require('../constants');

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

    const success = await actionDataAccess.deleteAction(assetName);

    return {
      success,
    };
  }

  static async getActionsFromBlockchain(cursor, size) {
    const response = await actionServiceClient.getActions(cursor, size);

    if (response?.status !== 200) {
      throw new ApiError(response.message, response.status);
    }

    return { actions: formatActionsFromChain(response?.data?.data) };
  }

  static async getActions(colonyName, filter = {}, sorter = {}, page = 0, limit = 10) {
    let colony;
    if (colonyName) {
      await colonyDataAccess.getColony(colonyName);
    }
    const actions = await actionDataAccess.getActions(colony?._id, filter, sorter, page, limit);

    return formatActions(actions);
  }

  static async getSale(assetName) {
    const { sales } = await this.getSales();
    let sale;

    for (let i = 0; i < sales?.length; i++) {
      if (sales[i].status !== 'EXPIRED' && sales[i]?.tokens?.[0].asset_name === assetName) {
        sale = sales[i];
        break;
      }
    }

    return {
      sale,
    };
  }

  static async createActionSale(assetName, price) {
    const action = await actionDataAccess.getAction(assetName);
    const { actionCollection} = action;
    console.log( { assetName, price, actionCollection})
    const priceInLovelace = ADA_TO_LOVELACE_CONVERSION * price;
    try {
      const paymentLink = await actionServiceClient.createActionSale(action.actionId, priceInLovelace, actionCollection);
      if (paymentLink !== '') {
        return {
          link: paymentLink,
        };
      }
    } catch {
      console.log('Sale can not be created, but maybe already exists.');
    }
    console.log( { action })
    const sale = await actionServiceClient.getSale(action.actionId, actionCollection);
    console.log( { sale })
    return {
      link: sale?.payment_link,
    };
  }

  static async getSales(size = 20) {
    const response = await actionServiceClient.getSales(size);

    if (response?.status !== 200) {
      throw new ApiError(response.message, response.status);
    }
    return { sales: response?.data?.data };
  }

  static async createActionCollection(walletAddress, assetName) {
    const collectionId = await actionServiceClient.createCollection(walletAddress, assetName);
    return { collectionId };
  }

  static async mintAction(action) {
    const { collectionId } = await this.createActionCollection(action.walletID, action.assetName);
    const toMint = prepareActionToMint(action);

    const response = await actionServiceClient.mintAction(toMint, collectionId);
    const createdAction = response?.data?.data[0];
    const preparedFiles = prepareAllImageURLsInFile(createdAction.files);
    console.log({ createdAction, action })

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
      actionCollection: collectionId,
      price: action.price,
    });

    return {
      success: true,
    };
  }
};
