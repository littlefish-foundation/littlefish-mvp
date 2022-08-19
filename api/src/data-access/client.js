const ClientModel = require('../models/client');
const { NotFoundError } = require('../errors');

module.exports = class ClientDataAccess {
  static async getClient(walletAddress) {
    const client = await ClientModel.findOne({ walletAddress }).select('-_id').lean().exec();

    if (!client) {
      throw new NotFoundError('Client is not found.');
    }

    return client;
  }

  static async createClient(client) {
    await ClientModel.create({ client });
  }

  static async deleteClient(client) {
    const { ok } = await ClientModel.deleteOne({ client });
    if (ok === 1) {
      return true;
    }
    throw new NotFoundError('Client is not found.');
  }

  static async getClientsByColony(colonyId) {
    return ClientModel.find({ colony: colonyId }).lean().exec();
  }

  static async updateClientColony(walletAddress, colonyId) {
    return ClientModel.findOneAndUpdate({ walletAddress }, { colony: colonyId });
  }
};
