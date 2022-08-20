const axios = require('axios');
const ApiError = require('../errors/api-error');

module.exports = class ActionServiceClient {
  static async deleteAction(actionId) {
    let response;
    const options = {
      method: 'DELETE',
      url: `${process.env.ACTION_SERVICE_URL}v1/nft/collections/${process.env.ACTION_BASE_COLLECTION_ID}/tokens/${actionId}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
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
      url: `${process.env.ACTION_SERVICE_URL}v1/nft/collections/${process.env.ACTION_BASE_COLLECTION_ID}/tokens`,
      params: { size, cursor },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    };

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
      url: `${process.env.ACTION_SERVICE_URL}v1/nft/collections/${process.env.ACTION_BASE_COLLECTION_ID}/tokens`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
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
      url: `${process.env.ACTION_SERVICE_URL}v1/nft/collections/${process.env.ACTION_BASE_COLLECTION_ID}/sales`,
      headers: { 'Content-Type': 'application/json', 'x-api-key': '' },
      data: {
        type: 'fixed',
        price,
        reservation_time: 300,
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
