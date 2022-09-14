const actionSaleDataAccess = require('../data-access/action-sale');
const actionService = require('./action');
const { NotFoundError } = require('../errors');
const tangocryptoClient = require('../external-api/tangocrypto-client');
const { ADA_TO_LOVELACE_CONVERSION } = require('../constants');

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

  static async createActionSale(actionSale) {
    const [sale, action] = await Promise.all(
      [actionSaleDataAccess.getSaleByActionID(actionSale.actionID),
        actionService.getActionById(actionSale.actionID),
      ],
    );

    if (sale) {
      return sale;
    }

    const price = (actionSale.price || action.price) * ADA_TO_LOVELACE_CONVERSION;
    const { createdSale } = await tangocryptoClient.createActionSale(action.chainID, price, action.actionCollection);
    console.log({ createdSale });

    await actionSaleDataAccess.createActionSale({
      saleId: createdSale.id,
      chainActionID: action.chainID,
      paymentLink: createdSale.payment_link,
      paymentAddress: createdSale.payment_address,
      colony: action.colony,
      action: action._id,
      status: createdSale.status,
      price,
    });

    return {
      success: true,
    };
  }

  static async updateActionSaleByActionID(id, updates) {
    await actionSaleDataAccess.updateActionSaleByActionID(id, updates);

    return {
      success: true,
    };
  }
};
