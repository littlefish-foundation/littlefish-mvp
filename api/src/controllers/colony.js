const colonyService = require('../services/colony');
const catchAsync = require('../utils/catch-async');

module.exports = class ColonyController {
  static getColony = catchAsync(async (req, res) => {
    const { colonyName } = req.params;

    const data = await colonyService.getColony(colonyName);
    res.status(200).send(data);
  });

  static deleteColony = catchAsync(async (req, res) => {
    const { colonyName } = req.params;

    const data = await colonyService.deleteColony(colonyName);
    res.status(200).send(data);
  });

  static getColonies = catchAsync(async (req, res) => {
    const {
      page, limit,
    } = req.query;

    const data = await colonyService.getColonies(page, limit);
    res.status(200).send(data);
  });

  static getColonyActions = catchAsync(async (req, res) => {
    const {
      colonyName,
    } = req.params;

    const {
      filter, sorter, page, limit,
    } = req.query;

    const data = await colonyService.getColonyActions(colonyName, filter, sorter, page, limit);
    res.status(200).send(data);
  });

  static createColony = catchAsync(async (req, res) => {
    const {
      colony,
    } = req.body;

    const data = await colonyService.createColony(colony);

    res.status(201).send(data);
  });

  static createColonyPreSignedUrls = catchAsync(async (req, res) => {
    const {
      files,
    } = req.body;

    const data = await colonyService.createColonyPreSignedUrls(files);

    res.status(200).send(data);
  });
};
