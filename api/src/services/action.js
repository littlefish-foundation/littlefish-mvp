const tangocryptoClient = require('../external-api/tangocrypto-client');
const actionDataAccess = require('../data-access/action');
const actionTypeDataAccess = require('../data-access/action-type');
const actionLogic = require('../logics/action');
const uploadImage = require('../utils/upload-image');
const { formatActions } = require('../formatters/action');
const { NotFoundError } = require('../errors');
const { API_IMAGES_LINK, ACTION_MAX_ALLOWED_LENGTH, ACTION_ASSET_NAME } = require('../constants');
const shortenUrl = require('../utils/shorten-url');

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
    const { actionID, actionCollection } = await this.getActionById(id);

    await tangocryptoClient.deleteAction(actionID, actionCollection);
    const success = await actionDataAccess.deleteActionById(id);

    return {
      success,
    };
  }

  static async syncActionStatus(id) {
    const { chainID, actionCollection } = await this.getActionById(id);

    const { action } = await tangocryptoClient.getAction(chainID, actionCollection);

    await actionDataAccess.syncActionStatus(id, action.status);

    return {
      success: true,
    };
  }

  static async getActions(colonyName, filter, sorter, page, limit) {
    const actions = await actionDataAccess.getActions(colonyName, filter, sorter, page, limit);

    return formatActions(actions);
  }

  static async createActionCollection(walletAddress, name) {
    const { collectionID } = await tangocryptoClient.createCollection(walletAddress, name);
    return collectionID;
  }

  static async handleMintActionTypes(type) {
    const actionType = await actionTypeDataAccess.getActionType(type);

    if (actionType) {
      await actionTypeDataAccess.incrementActionType(actionType.name);
      return;
    }
    await actionTypeDataAccess.createActionType(type);
  }

  static async uploadAllImages(coverImage, files) {
    const promises = [];
    promises.push(uploadImage(coverImage));

    for (const file of files) {
      promises.push(uploadImage(file.src));
    }
    const fileNames = await Promise.all(promises);
    return fileNames.map((f) => API_IMAGES_LINK + f);
  }

  static async shortenURLsThatLongerThanLimit(links) {
    const promises = [];
    if (!links) return links;

    for (const link of links) {
      if (link.url.length > ACTION_MAX_ALLOWED_LENGTH) {
        promises.push(shortenUrl(link.url));
      } else {
        promises.push(Promise.resolve(link.url));
      }
    }

    const shortLinks = await Promise.all(promises);
    return links.map((l, i) => ({ ...l, url: shortLinks[i] }));
  }

  static async mintAction(action) {
    const mintDate = Math.floor(Date.now() / 1000);
    const ulid = actionLogic.generateUlid();
    const links = await this.shortenURLsThatLongerThanLimit(action.links);
    const toMint = actionLogic.prepareActionToMint(action, links, ulid, mintDate);
    const collectionID = await this.createActionCollection(action.walletAddress, action.name);
    const { mintedAction } = await tangocryptoClient.mintAction(toMint, collectionID);
    const preparedFiles = actionLogic.prepareAllImageURLsInFile(mintedAction.files);

    const promises = [];
    action.types?.forEach((t) => promises.push(this.handleMintActionTypes(t)));

    promises.push(actionDataAccess.createAction({
      chainID: mintedAction.id,
      assetName: ACTION_ASSET_NAME,
      name: mintedAction.name,
      fingerprint: mintedAction.fingerprint,
      mediaType: mintedAction.media_type,
      status: mintedAction.status,
      rawActionFormat: mintedAction,
      producer: action.walletAddress,
      producerName: action.producerName,
      colony: action.colony,
      description: action.description,
      types: action.types,
      minimumPrice: action.minimumPrice,
      image: actionLogic.prepareImageURL(mintedAction.image),
      files: preparedFiles,
      actionCollection: collectionID,
      links,
      ulid,
      mintDate,
    }));

    await Promise.all(promises);
    return {
      success: true,
    };
  }

  static async syncActionWebhook(hook) {
    const collectionID = hook?.data?.collectionId;
    if (!collectionID) {
      throw new NotFoundError('Action could not be found.');
    }

    await actionDataAccess.setActionSoldWithCollectionID(collectionID);
    return {
      success: true,
    };
  }

  static getNumberOfActionsInColony(colonyName) {
    return actionDataAccess.getNumberOfActionsInColony(colonyName);
  }
};
