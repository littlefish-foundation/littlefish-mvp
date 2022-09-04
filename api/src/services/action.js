const tangocryptoClient = require('../external-api/tangocrypto-client');
const actionDataAccess = require('../data-access/action');
const colonyDataAccess = require('../data-access/colony');
const { prepareAllImageURLsInFile, prepareImageURL, prepareActionToMint } = require('../logics/action');
const { formatActions } = require('../formatters/action');
const { ApiError, NotFoundError } = require('../errors');
const { ADA_TO_LOVELACE_CONVERSION } = require('../constants');

module.exports = class ActionService {
  static async getActionById(id) {
    const action = await actionDataAccess.getActionById(id);

    if (!action) {
      throw new NotFoundError(`Action with id: ${id} is not found.`);
    }

    return action;
  }

  static async getActionByBlockchainId(id) {
    const action = await actionDataAccess.getActionByBlockchainId(id);

    if (!action) {
      throw new NotFoundError(`Action with chain id: ${id} is not found.`);
    }

    return action;
  }

  static async deleteAction(id) {
    const { actionId, actionCollection } = await this.getActionById(id);

    // TODO action response obj
    await tangocryptoClient.deleteAction(actionId, actionCollection);

    const success = await actionDataAccess.deleteActionById(id);

    return {
      success,
    };
  }

  static async syncActionStatus(id) {
    const { actionId, actionCollection } = await this.getActionById(id);

    // TODO action response obj
    const action = await tangocryptoClient.getAction(actionId, actionCollection);

    await actionDataAccess.syncActionStatus(id, action.status);

    return {
      success: true,
    };
  }

  static async getActions(colonyName, filter, sorter, page, limit) {
    let colony;
    if (colonyName) {
      colony = await colonyDataAccess.getColonyByName(colonyName);
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

  static async createActionSale(id) {
    const action = await actionDataAccess.getActionById(id);
    const { actionCollection } = action;
    console.log({ id, actionCollection });

    const priceInLovelace = ADA_TO_LOVELACE_CONVERSION * action.price;
    try {
      const paymentLink = await tangocryptoClient.createActionSale(action.actionId, priceInLovelace, actionCollection);
      if (paymentLink !== '') {
        return {
          link: paymentLink,
        };
      }
    } catch {
      console.log('Sale can not be created, but maybe already exists.');
    }
    console.log({ action });
    const sale = await tangocryptoClient.getSales(10, actionCollection);
    return {
      link: sale?.data?.data?.[0]?.payment_link,
    };
  }

  static async getSales(size = 20) {
    const response = await tangocryptoClient.getSales(size);

    if (response?.status !== 200) {
      throw new ApiError(response.message, response.status);
    }
    return { sales: response?.data?.data };
  }

  static async createActionCollection(walletAddress, assetName) {
    const collectionId = await tangocryptoClient.createCollection(walletAddress, assetName);
    return { collectionId };
  }

  static async mintAction(action) {
    const { collectionId } = await this.createActionCollection(action.walletID, action.assetName);
    const toMint = prepareActionToMint(action);

    const response = await tangocryptoClient.mintAction(toMint, collectionId);
    const createdAction = response?.data?.data[0];
    const preparedFiles = prepareAllImageURLsInFile(createdAction.files);
    console.log({ createdAction, action });

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
