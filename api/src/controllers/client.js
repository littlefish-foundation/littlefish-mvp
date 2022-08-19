const clientService = require('../services/client');
const catchAsync = require('../utils/catch-async');

module.exports = class ClientController {
  static getClient = catchAsync(async (req, res) => {
    const { walletAddress } = req.params;

    const data = await clientService.getClient(walletAddress);
    res.status(200).send(data);
  });

  static deleteClient = catchAsync(async (req, res) => {
    const { walletAddress } = req.params;

    const data = await clientService.deleteClient(walletAddress);
    res.status(200).send(data);
  });

  static createClient = catchAsync(async (req, res) => {
    const result = await clientService.createClient(req.body);
    res.status(201).send(result);
  });

  static updateClientColony = catchAsync(async (req, res) => {
    const { walletAddress } = req.params;
    const { colonyName } = req.query;

    const result = await clientService.updateClientColony(walletAddress, colonyName);
    res.status(201).send(result);
  });
};
