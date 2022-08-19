const clientDataAccess = require('../data-access/client');
const colonyDataAccess = require('./colony');

module.exports = class ClientService {
  static async getClient(walletAddress) {
    return clientDataAccess.getClient(walletAddress);
  }

  static async deleteClient(walletAddress) {
    const success = await clientDataAccess.deleteClient(walletAddress);

    return {
      success,
    };
  }

  static async createClient(client) {
    await clientDataAccess.createClient(client);

    return {
      success: true,
    };
  }

  static async updateClientColony(walletAddress, colonyName) {
    const colony = await colonyDataAccess.getColony(colonyName);

    // eslint-disable-next-line no-underscore-dangle
    await clientDataAccess.updateClientColony(walletAddress, colony._id);

    return {
      success: true,
    };
  }
};
