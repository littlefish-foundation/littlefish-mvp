const userService = require('../services/user');
const catchAsync = require('../utils/catch-async');

module.exports = class UserController {
  static getUser = catchAsync(async (req, res) => {
    const { walletAddress } = req.params;

    const data = await userService.getUser(walletAddress);
    res.status(200).send(data);
  });

  static deleteUser = catchAsync(async (req, res) => {
    const { walletAddress } = req.params;

    const data = await userService.deleteUser(walletAddress);
    res.status(200).send(data);
  });

  static createUser = catchAsync(async (req, res) => {
    const result = await userService.createUser(req.body);
    res.status(201).send(result);
  });

  static updateUserColony = catchAsync(async (req, res) => {
    const { walletAddress } = req.params;
    const { colonyName } = req.query;

    const result = await userService.updateUserColony(walletAddress, colonyName);
    res.status(201).send(result);
  });
};
