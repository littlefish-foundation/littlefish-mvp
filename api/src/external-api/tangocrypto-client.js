const axios = require('axios');
const ApiError = require('../errors/api-error');
const config = require('../config');
const { ACTION_METADATA_ATTRIBUTES } = require('../constants');

module.exports = class TangocryptoClient {
  static async createCollection(walletAddresses, name) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: {
        name: `${name}Collection`,
        url: 'https://linktr.ee/littlefish.foundation',
        description: 'This is a collection for an action in the Littlefish colony',
        payout_address: walletAddresses,
        policy: { lock: false },
        metadata: {
          name: ACTION_METADATA_ATTRIBUTES.NAME,
          description: ACTION_METADATA_ATTRIBUTES.DESCRIPTION,
          asset_name: ACTION_METADATA_ATTRIBUTES.ASSET_NAME,
          media_type: ACTION_METADATA_ATTRIBUTES.MIME_TYPE,
          files: [
            {
              name: ACTION_METADATA_ATTRIBUTES.ASSET_NAME,
              media_type: ACTION_METADATA_ATTRIBUTES.MIME_TYPE,
              src: ACTION_METADATA_ATTRIBUTES.FILE_LINK,
            },
          ],
          attributes: {
            colony: ACTION_METADATA_ATTRIBUTES.COLONY,
            mint_date: ACTION_METADATA_ATTRIBUTES.MINT_DATE,
            id: ACTION_METADATA_ATTRIBUTES.ID,
            producer: ACTION_METADATA_ATTRIBUTES.PRODUCER,
            version: ACTION_METADATA_ATTRIBUTES.VERSION,
            links: ACTION_METADATA_ATTRIBUTES.LINKS,
            types: ACTION_METADATA_ATTRIBUTES.TYPES,
          },
        },
        version: '1.0',
      },
    };

    const response = await this.actionRequestSender(options, 201);

    return {
      collectionID: response.data.id,
    };
  }

  static async deleteAction(actionID, collectionID) {
    const options = {
      method: 'DELETE',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/tokens/${actionID}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = await this.actionRequestSender(options, 200);

    return {
      success: response?.data?.deleted || false,
    };
  }

  static async getActionSale(actionID, collectionID) {
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/sales/${actionID}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = await this.actionRequestSender(options, 200);

    return {
      sale: response.data,
    };
  }

  static async deleteActionSale(saleID, actionChainID, collectionID) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/tokens/${actionChainID}/sales/${saleID}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: {},
    };

    const response = await this.actionRequestSender(options, 201);

    return {
      deletedSale: response.data,
    };
  }

  static async getAction(actionID, collectionID) {
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/tokens/${actionID}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = await this.actionRequestSender(options, 200);

    return {
      action: response.data,
    };
  }

  static async mintAction(action, collectionID) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/tokens`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: action,
    };

    const response = await this.actionRequestSender(options, 201);

    return {
      mintedAction: response.data.data[0],
    };
  }

  static async createActionSale(actionID, price, collectionID) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/sales`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: {
        type: 'fixed',
        price,
        tokens: [actionID],
        reservation_time: 900,
      },
    };

    const response = await this.actionRequestSender(options, 201);
    console.log({ response });
    return {
      createdSale: response.data,
    };
  }

  static async actionRequestSender(options, expectedCode) {
    let response;
    try {
      response = await axios.request(options);
    } catch (e) {
      const error = e?.response?.data || {
        statusCode: 500,
        message: 'Tangocrypto server error.',
      };
      throw new ApiError((Array.isArray(error.message) && error.message.join('\n')) || error.message, error?.statusCode || 500);
    }

    if (response && response.status !== expectedCode) {
      throw new ApiError(JSON.stringify(response) || 'Tangocrypto server error.', 500);
    }

    return response;
  }
};
