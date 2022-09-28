const tangocryptoClient = require('../external-api/tangocrypto-client');
const actionDataAccess = require('../data-access/action');
const actionTypeDataAccess = require('../data-access/action-type');
const actionLogic = require('../logics/action');
const uploadImage = require('../utils/upload-image');
const { formatActions } = require('../formatters/action');
const { NotFoundError } = require('../errors');
const { API_IMAGES_LINK } = require('../constants');

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

    // TODO action response obj
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

  static async createActionCollection(walletAddress, assetName, collectionLinkAttributes) {
    const { collectionID } = await tangocryptoClient.createCollection(walletAddress, assetName, collectionLinkAttributes);
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

    for (let i = 0; i < files.length; i++) {
      promises.push(uploadImage(files[i].src));
    }
    const fileNames = await Promise.all(promises);
    return fileNames.map((f) => API_IMAGES_LINK + f);
  }

  static async mintAction(action) {
    const { actionLinks, collectionLinkAttributes } = actionLogic.prepareLinksToMint(action.links);
    const toMint = actionLogic.prepareActionToMint(action, actionLinks);
    const collectionID = await this.createActionCollection(action.walletID, action.assetName, collectionLinkAttributes);
    const { mintedAction } = await tangocryptoClient.mintAction(toMint, collectionID);
    const preparedFiles = actionLogic.prepareAllImageURLsInFile(mintedAction.files);

    const promises = [];
    for (let i = 0; i < action.actionTypes.length; i++) {
      promises.push(this.handleMintActionTypes(action.actionTypes[i]));
    }
    // const fileNames = await this.uploadAllImages(action.image, action.files);

    promises.push(actionDataAccess.createAction({
      assetName: mintedAction.asset_name,
      chainID: mintedAction.id,
      name: mintedAction.name,
      producer: action.ownerName,
      ownerName: action.ownerName,
      colony: action.colonyName,
      fingerprint: mintedAction.fingerprint,
      description: action.description,
      mediaType: mintedAction.media_type,
      links: action.links,
      image: actionLogic.prepareImageURL(mintedAction.image),
      status: mintedAction.status,
      actionTypes: action.actionTypes,
      files: preparedFiles,
      nftFormat: mintedAction,
      custom_attributes: mintedAction.custom_attributes,
      actionCollection: collectionID,
      minimumPrice: action.price,
      // dbImage: fileNames?.[0],
      // dbFiles: fileNames?.slice(1),
    }));

    await Promise.all(promises);
    return {
      success: true,
    };
  }
};
