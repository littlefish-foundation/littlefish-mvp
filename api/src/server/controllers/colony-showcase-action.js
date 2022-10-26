const ColonyShowcaseActionService = require('../../services/colony-showcase-action');
const catchAsync = require('../../utils/catch-async');

module.exports = class ColonyShowcaseActionController {
  static getShowcase = catchAsync(async (req, res) => {
    const { colonyName } = req.params;

    const data = await ColonyShowcaseActionService.getShowcase(colonyName);
    res.status(200).send(data);
  });

  static addActionToShowcase = catchAsync(async (req, res) => {
    const { colonyName } = req.params;
    const { actionID } = req.query;

    await ColonyShowcaseActionService.addActionToShowcase(colonyName, actionID);

    res.status(200).send({
      success: true,
    });
  });

  static deleteShowcaseByColony = catchAsync(async (req, res) => {
    const { colonyName } = req.params;

    await ColonyShowcaseActionService.deleteShowcaseByColony(colonyName);

    res.status(200).send({
      success: true,
    });
  });

  static deleteActionFromShowcase = catchAsync(async (req, res) => {
    const { colonyName } = req.params;
    const { actionID } = req.query;

    const data = await ColonyShowcaseActionService.deleteActionFromShowcase(colonyName, actionID);

    res.status(200).send(data);
  });
};
