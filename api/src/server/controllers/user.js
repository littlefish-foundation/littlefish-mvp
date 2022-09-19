const userService = require('../../services/user');
const catchAsync = require('../../utils/catch-async');

module.exports = class UserController {
  static getUserByName = catchAsync(async (req, res) => {
    const { name } = req.params;

    const data = await userService.getUserByName(name);
    res.status(200).send(data);
  });

  static deleteUserByName = catchAsync(async (req, res) => {
    const { name } = req.params;

    const data = await userService.deleteUserByName(name);
    res.status(200).send(data);
  });

  static getUsersByColony = catchAsync(async (req, res) => {
    const { colonyName, page, limit } = req.query;

    const data = await userService.getUsersByColony(colonyName, page, limit);
    res.status(200).send(data);
  });

  static createUser = catchAsync(async (req, res) => {
    const user = req.body;
    const result = await userService.createUser(user);
    res.status(201).send(result);
  });

  static updateUserColony = catchAsync(async (req, res) => {
    const { name } = req.params;
    const { colonyName } = req.query;

    const result = await userService.updateUserColony(name, colonyName);
    res.status(200).send(result);
  });

  static getUsers = catchAsync(async (req, res) => {
    const { page, limit } = req.query;

    const data = await userService.getUsers(page, limit);
    res.status(200).send(data);
  });
};
