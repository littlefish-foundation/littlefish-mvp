const axios = require('axios');
const ApiError = require('../errors/api-error');
const config = require('../config');
const { ACTION_METADATA_ATTRIBUTES } = require('../constants');

module.exports = class TangocryptoClient {
  static async createCollection(walletAddress, assetName, collectionLinkAttributes) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: {
        name: `${assetName}Collection`,
        url: 'https://linktr.ee/littlefish.foundation',
        description: 'This is a collection for an action in the Littlefish colony',
        payout_address: walletAddress,
        policy: { lock: false },
        metadata: {
          name: '<name>',
          asset_name: '<asset_name>',
          media_type: '<mime_type>',
          files: [
            {
              name: '<asset_name>',
              media_type: '<mime_type>',
              src: '<file_link_1>',
            },
          ],
          attributes: {
            colony_name: '<colony_name>',
            desc1: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART1,
            desc2: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART2,
            desc3: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART3,
            desc4: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART4,
            owner_name: '<owner_name>',
            action_type: '<action_type>',
            producer: '<producer>',
            project: 'Littlefish MVP',
            ...collectionLinkAttributes,
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
