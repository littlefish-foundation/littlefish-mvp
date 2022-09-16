const tangocryptoClient = require('../external-api/tangocrypto-client');
const actionSaleDataAccess = require('../data-access/action-sale');
const actionService = require('./action');

const { ADA_TO_LOVELACE_CONVERSION } = require('../constants');
const { NotFoundError, BadRequestError } = require('../errors');

module.exports = class ActionSaleService {
  static async getSaleByActionID(id) {
    const actionSale = await actionSaleDataAccess.getSaleByActionID(id);

    if (!actionSale) {
      throw new NotFoundError(`Sale for action id: ${id} is not found.`);
    }
    return actionSale;
  }

  static async deleteActionSaleByActionID(id) {
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

    const loveLacePrice = price * ADA_TO_LOVELACE_CONVERSION;
    const { createdSale } = await tangocryptoClient.createActionSale(action.chainID, loveLacePrice, action.actionCollection);

    const sale = {
      saleId: createdSale.id,
      chainActionID: action.chainID,
      paymentLink: createdSale.payment_link,
      paymentAddress: createdSale.payment_address,
      colony: action.colony,
      action: action._id,
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
