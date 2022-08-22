const axios = require('axios');
const ApiError = require('../errors/api-error');
const config = require('../config');

module.exports = class ActionServiceClient {
  static async deleteAction(actionId) {
    let response;
    const options = {
      method: 'DELETE',
      url: `${config.actionServiceClient.url}v1/nft/collections/${config.actionServiceClient.baseCollectionId}/tokens/${actionId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    try {
      response = await axios.request(options);
    } catch {
      if (!response || response.status !== 200) throw new ApiError('Blockchain Server Error', 500);
    }

    return response;
  }

  static async getActions(cursor = undefined, size = 10) {
    let response;
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${config.actionServiceClient.baseCollectionId}/tokens`,
      params: { size, cursor },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    try {
      response = await axios.request(options);
    } catch {
      if (!response || response.status !== 200) throw new ApiError('Blockchain Server Error', 500);
    }

    return response;
  }

  static async getSales(size) {
    const options = {
      method: 'GET',
      url: `${config.actionServiceClient.url}v1/nft/collections/${config.actionServiceClient.baseCollectionId}/sales`,
      params: { size },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
    };

    let response;
    try {
      response = await axios.request(options);
    } catch {
      if (!response || response.status !== 200) throw new ApiError('Blockchain Server Error', 500);
    }
    return response;
  }

  static async mintAction(action) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections/${config.actionServiceClient.baseCollectionId}/tokens`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: action,
    };

    const response = await axios.request(options);
    if (response && response.status !== 201) {
      throw new ApiError();
    }

    return response;
  }

  static async createActionSale(actionId, price) {
    const options = {
      method: 'POST',
      url: `${config.actionServiceClient.url}v1/nft/collections/${config.actionServiceClient.baseCollectionId}/sales`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.actionServiceClient.apiKey,
      },
      data: {
        type: 'fixed',
        price,
        tokens: [actionId],
      },
    };

    const response = await axios.request(options);

    if (response && response.status !== 201) {
      throw new ApiError();
    }

    return response;
  }
};
