const colonyService = require('../../services/colony');
const catchAsync = require('../../utils/catch-async');

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

  static getParentSubColonies = catchAsync(async (req, res) => {
    const { colonyName } = req.params;
    const {
      name, producerName, status, minDate, maxDate, sortingOrder, sortingField, page, limit, type,
    } = req.query;

    const data = await colonyService.getParentSubColonies(colonyName, {
      name, producerName, status, minDate, maxDate, type,
    }, { sortingOrder, sortingField }, page, limit);
    res.status(200).send(data);
  });

  static getColonyActions = catchAsync(async (req, res) => {
    const {
      colonyName,
    } = req.params;

    const {
      name, producerName, status, minDate, maxDate, sortingOrder, sortingField, page, limit, type,
    } = req.query;

    const data = await colonyService.getColonyActions(colonyName, {
      name, producerName, status, minDate, maxDate, type,
    }, { sortingOrder, sortingField }, page, limit);
    res.status(200).send(data);
  });

  static createColony = catchAsync(async (req, res) => {
    res.status(500).send({
      message: 'Colonies will not be created at this point. Littlefish Foundation is the only colony available.',
    });
  });
};
