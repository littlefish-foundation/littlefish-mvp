const actionServiceClient = require('./action-client');
const ActionModel = require('../models/action');
const { prepareAllImageURLsInFile, prepareImageURL, prepareActionToMint } = require('../logics/action');
const { formatActionsFromChain, formatActions } = require('../formatters/action');
const { ApiError, NotFoundError } = require('../errors');

async function getAction(assetName) {
  const action = await ActionModel.findOne({ assetName }).select('-_id').lean().exec();

  if (!action) {
    throw new NotFoundError('Action is not found.');
  }

  return action;
}

async function getActionsFromBlockchain(cursor, size) {
  const response = await actionServiceClient.getActions(cursor, size);

  if (response?.status !== 200) {
    throw new ApiError(response.message, response.status);
  }

  return formatActionsFromChain(response?.data?.data);
}

async function getActions(colonyName = undefined, filter = {}, sorter = {}, page = 0, limit = 10) {
  const {
    assetName, ownerName, minDate, maxDate,
  } = filter;

  const {
    sortingField, sortingOrder,
  } = sorter;
  const actions = await ActionModel.find({
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

  return formatActions(actions);
}

async function mintAction(action) {
  const toMint = prepareActionToMint(action);

  const response = await actionServiceClient.mintAction(toMint);
  const createdAction = response?.data?.data[0];
  const preparedFiles = prepareAllImageURLsInFile(createdAction.files);

  await ActionModel.create({
    assetName: createdAction.asset_name,
    actionId: createdAction.id,
    name: createdAction.name,
    producer: action.ownerName,
    ownerName: action.ownerName,
    colonyName: action.colonyName,
    fingerprint: createdAction.fingerprint,
    description: action.description,
    mediaType: createdAction.media_type,
    image: prepareImageURL(createdAction.image),
    status: createdAction.status,
    actionType: action.actionType,
    files: preparedFiles,
    nftFormat: createdAction,
    custom_attributes: createdAction.custom_attributes,
    actionCollection: '01g99p2tr5evasrp2kyn25hqwe',
  });

  return {
    success: true,
  };
}

module.exports = {
  getAction,
  getActions,
  getActionsFromBlockchain,
  mintAction,
};
