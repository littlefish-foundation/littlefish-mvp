const tangocryptoClient = require('../external-api/tangocrypto-client');
const actionDataAccess = require('../data-access/action');
const colonyDataAccess = require('../data-access/colony');
const actionTypeDataAccess = require('../data-access/action-type');
const actionLogic = require('../logics/action');
const { formatActions } = require('../formatters/action');
const { NotFoundError } = require('../errors');
const { ADA_TO_LOVELACE_CONVERSION } = require('../constants');

module.exports = class ActionService {
  static async getActionById(id) {
    const action = await actionDataAccess.getActionById(id);

    if (!action) {
      throw new NotFoundError(`Action with id: ${id} is not found.`);
    }

    return action;
  }

  static async getActionByBlockchainId(chainID) {
    const action = await actionDataAccess.getActionByBlockchainId(chainID);

    if (!action) {
      throw new NotFoundError(`Action with chain id: ${chainID} is not found.`);
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
    const { action } = await tangocryptoClient.getAction(actionId, actionCollection);

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

  static async createActionCollection(walletAddress, assetName, collectionLinkAttributes) {
    const collectionID = await tangocryptoClient.createCollection(walletAddress, assetName, collectionLinkAttributes);
    return { collectionID };
  }

  static async mintAction(action) {
    const { actionLinks, collectionLinkAttributes } = actionLogic.prepareLinksToMint(action.links);
    const toMint = actionLogic.prepareActionToMint(action, actionLinks);
    const { collectionID } = await this.createActionCollection(action.walletID, action.assetName, collectionLinkAttributes);
    const { mintedAction } = await tangocryptoClient.mintAction(toMint, collectionID);

    const actionType = actionTypeDataAccess.getActionType(action.actionType);
    if (actionType) {
      await actionTypeDataAccess.incrementActionType(actionType.name);
    } else {
      await actionTypeDataAccess.createActionType(action.actionType);
    }

    const preparedFiles = actionLogic.prepareAllImageURLsInFile(mintedAction.files);

    await actionDataAccess.createAction({
      assetName: mintedAction.asset_name,
      chainID: mintedAction.id,
      name: mintedAction.name,
      producer: action.ownerName,
      ownerName: action.ownerName,
      colonyName: action.colonyName,
      fingerprint: mintedAction.fingerprint,
      description: action.description,
      mediaType: mintedAction.media_type,
      links: action.links,
      image: actionLogic.prepareImageURL(mintedAction.image),
      status: mintedAction.status,
      actionType: action.actionType,
      files: preparedFiles,
      nftFormat: mintedAction,
      custom_attributes: mintedAction.custom_attributes,
      actionCollection: collectionID,
      price: action.price,
    });

    return {
      success: true,
    };
  }
};
