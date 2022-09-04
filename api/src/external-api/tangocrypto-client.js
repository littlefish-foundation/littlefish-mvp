const axios = require('axios');
const ApiError = require('../errors/api-error');
const config = require('../config');

module.exports = class TangocryptoClient {
  static async createCollection(walletAddress, assetName) {
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
          description: '<description>',
          files: [
            {
              name: '<asset_name>',
              media_type: '<mime_type>',
              src: '<file_link_1>',
            },
          ],
          attributes: {
            desc1: '<desc1>',
            colony_name: '<colony_name>',
            desc2: '<desc2>',
            desc3: '<desc3>',
            owner_name: '<owner_name>',
            action_type: '<action_type>',
            producer: '<producer>',
            link_1: '<link_1>',
            link_2: '<link_2>',
            link_11: '<link_11>',
            link_22: '<link_22>',
            project: 'Littlefish MVP',
          },
        },
        version: '1.0',
      },
    };

    const response = this.actionRequestSender(options, 201);

    return {
      response,
    };
  }

  static async deleteAction(actionId, collectionID) {
    const options = {
      method: 'DELETE',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/tokens/${actionId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = this.actionRequestSender(options, 200);

    return {
      response,
    };
  }

  static async getSales(size, collectionID) {
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/sales`,
      params: { size },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = this.actionRequestSender(options, 200);

    return {
      response,
    };
  }

  static async getSale(actionId, collectionID) {
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/sales/${actionId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = this.actionRequestSender(options, 200);

    return {
      response,
    };
  }

  static async getAction(actionId, collectionID) {
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${collectionID}/tokens/${actionId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    const response = this.actionRequestSender(options, 200);

    return {
      response,
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

    const response = this.actionRequestSender(options, 201);

    return {
      response,
    };
  }

  static async createActionSale(actionId, price, collectionID) {
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
        tokens: [actionId],
        reservation_time: 900,
      },
    };

    const response = this.actionRequestSender(options, 201);

    return {
      response,
    };
  }

  static async actionRequestSender(options, expectedCode) {
    let response;
    try {
      response = await axios.request(options);
    } catch {
      throw new ApiError('Blockchain Server Error', 500);
    }

    if (response && response.status !== expectedCode) {
      throw new ApiError();
    }

    return response;
  }
};
