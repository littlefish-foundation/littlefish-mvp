const actionServiceClient = require('./action-client');
const ActionModel = require('../models/action');
const { prepareAllImageURLsInFile, prepareImageURL, prepareActionToMint } = require('../logics/action');
const { formatActionsFromChain } = require('../formatters/action');
const ApiError = require('../errors/api-error');

async function getActionsFromBlokchain(cursor, size) {
  const response = await actionServiceClient.getActions(cursor, size);

  if (response?.status !== 200) {
    throw new ApiError(response.message, response.status);
  }

  return formatActionsFromChain(response?.data?.data);
}

async function getActionsFromDatabase(page = 0, limit = 10) {
  return ActionModel.find().skip(page * limit).limit(limit).lean()
    .exec();
}

async function mintAction(action) {
  const toMint = prepareActionToMint(action);

  const response = await actionServiceClient.mintAction(toMint);
  const createdAction = response?.data?.data[0];
  const preparedFiles = prepareAllImageURLsInFile(createdAction.files);

  await ActionModel.create({
    asset_name: createdAction.asset_name,
    actionId: createdAction.id,
    name: createdAction.name,
    fingerprint: createdAction.fingerprint,
    description: createdAction.desc,
    media_type: createdAction.media_type,
    image: prepareImageURL(createdAction.image),
    status: createdAction.status,
    files: preparedFiles,
    metadata: createdAction.metadata,
    custom_attributes: createdAction.custom_attributes,
  });

  return {
    success: true,
  };
}

module.exports = {
  getActionsFromDatabase,
  getActionsFromBlokchain,
  mintAction,
};
