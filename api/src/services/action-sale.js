const tangocryptoClient = require('../external-api/tangocrypto-client');
const actionSaleDataAccess = require('../data-access/action-sale');
const actionService = require('./action');

const { ADA_TO_LOVELACE_CONVERSION, SALE_LAST_ACCESSED_DEADLINE } = require('../constants');
const { NotFoundError, BadRequestError, ApiError } = require('../errors');

module.exports = class ActionSaleService {
  static async getSaleByActionID(id, walletAddress) {
    const actionSale = await actionSaleDataAccess.getSaleByActionID(id, walletAddress);

    if (!actionSale) {
      throw new NotFoundError(`Sale for action id: ${id} is not found.`);
    }

    if (actionSale.lastAccessedWallet !== walletAddress && actionSale.lastAccessed
        && actionSale.lastAccessed > Date.now() - SALE_LAST_ACCESSED_DEADLINE) {
      throw new ApiError('The action sale is currently reserved ', 403);
    }
    await actionSaleDataAccess.setLastAccessed(id, walletAddress);

    return actionSale;
  }

  static async deleteActionSaleByActionID(id) {
    const { saleID, chainActionID, actionCollection } = await this.getSaleByActionID(id);
    await tangocryptoClient.deleteActionSale(saleID, chainActionID, actionCollection);

    const success = await actionSaleDataAccess.deleteActionSaleByActionID(id);

    return {
      success,
    };
  }

  static async createActionSale({ actionID, price }) {
    const action = await actionService.getActionById(actionID);

    if (price <= action.minimumPrice) {
      throw new BadRequestError(`Price should be equal to or greater than ${action.minimumPrice}`);
    }

    const previousSale = await actionSaleDataAccess.getSaleByActionID(actionID);
    if (previousSale) {
      try {
        await tangocryptoClient.deleteActionSale(previousSale.saleID, previousSale.chainActionID, previousSale.actionCollection);
      } catch (err) {
        console.log(err);
        return {
          sale: previousSale,
        };
      }
    }
    await actionSaleDataAccess.deleteActionSaleByActionID(actionID);

    const loveLacePrice = price * ADA_TO_LOVELACE_CONVERSION;
    const { createdSale } = await tangocryptoClient.createActionSale(action.chainID, loveLacePrice, action.actionCollection);

    const sale = {
      saleID: createdSale.id,
      chainActionID: action.chainID,
      paymentLink: createdSale.payment_link,
      paymentAddress: createdSale.payment_address,
      colony: action.colony,
      action: action._id,
      actionCollection: action.actionCollection,
      status: createdSale.status,
      price,
    };
    await actionSaleDataAccess.createActionSale(sale);

    return {
      sale,
    };
  }

  static async updateActionSaleByActionID(id, updates) {
    await actionSaleDataAccess.updateActionSaleByActionID(id, updates);

    return {
      success: true,
    };
  }
};
