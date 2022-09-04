const actionSaleDataAccess = require('../data-access/action-sale');
const actionService = require('./action');
const { NotFoundError } = require('../errors');
const tangocryptoClient = require('../external-api/tangocrypto-client');
const { ADA_TO_LOVELACE_CONVERSION } = require('../constants');

module.exports = class ActionSaleService {
  static async getSaleByActionId(id) {
    const actionSale = await actionSaleDataAccess.getSaleByActionId(id);

    if (!actionSale) {
      throw new NotFoundError(`Sale for action id: ${id} is not found.`);
    }
    return actionSale;
  }

  static async deleteActionSaleByActionId(id) {
    const success = await actionSaleDataAccess.deleteActionSaleByActionId(id);

    return {
      success,
    };
  }

  static async createActionSale(actionSale) {
    const [sale, action] = await Promise.all(
      [actionSaleDataAccess.getSaleByActionId(actionSale.actionId),
        actionService.getActionById(actionSale.actionId),
      ],
    );
    if (sale) {
      return sale;
    }

    const price = (actionSale.price || action.price) * ADA_TO_LOVELACE_CONVERSION;
    const { createdSale } = await tangocryptoClient.createActionSale(action.actionId, price, action.actionCollection);

    // TODO createActionSale response
    await actionSaleDataAccess.createActionSale({
      saleId: createdSale.id,
      chainActionId: action.actionId,
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

  static async updateActionSaleByActionId(id, updates) {
    // TODO resp
    await actionSaleDataAccess.updateActionSaleByActionId(id, updates);

    return {
      success: true,
    };
  }
};
