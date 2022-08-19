const ActionModel = require('../models/action');
const { NotFoundError } = require('../errors');

module.exports = class ActionDataAccess {
  static async getAction(assetName) {
    const action = await ActionModel.findOne({ assetName }).select('-_id').lean().exec();

    if (!action) {
      throw new NotFoundError('Action is not found.');
    }

    return action;
  }

  static async createAction(action) {
    await ActionModel.create(action);
  }

  static async deleteAction(assetName) {
    const { ok } = await ActionModel.deleteOne({ assetName });
    if (ok === 1) {
      return true;
    }
    throw new NotFoundError('Action is not found.');
  }

  static async getActions(colonyName, filter, sorter, page, limit) {
    const {
      assetName, ownerName, minDate, maxDate,
    } = filter;

    const {
      sortingField, sortingOrder,
    } = sorter;

    return ActionModel.find({
      ...(colonyName ? { colonyName } : undefined),
      ...(minDate ? { createdAt: { $gte: minDate } } : undefined),
      ...(maxDate ? { createdAt: { $lte: maxDate } } : undefined),
      ...(ownerName ? { ownerName } : undefined),
      ...(assetName ? { assetName: { $regex: assetName, $options: 'i' } } : undefined),
    })
      .select('-_id')
      .skip(page * limit).limit(limit)
      .sort({
        ...(sortingField ? { sortingField: sortingOrder } : undefined),
      })
      .lean()
      .exec();
  }
};
