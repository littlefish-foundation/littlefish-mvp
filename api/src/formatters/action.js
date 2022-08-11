const { ACTION_METADATA_STANDARD, ACTION_ASSET_OBJECT_PROPERTY_NAME } = require('../constants');
const { prepareImageURL } = require('../logics/action');

function formatActionsFromChain(actions) {
  let attributes;
  let tokenId = -1;
  return (actions || []).map((action) => {
    attributes = action.metadata[ACTION_METADATA_STANDARD]?.
      [ACTION_ASSET_OBJECT_PROPERTY_NAME]?.[action.asset_name];

    tokenId += 1;

    return {
      tokenId,
      actionId: action.id,
      name: action.name,
      assetName: action.asset_name,
      ownerName: attributes?.owner_name,
      description: (attributes?.desc1 || '') + (attributes?.desc2 || '')
      + (attributes?.desc3 || '') + (attributes?.desc4 || ''),
      youtubeLink: (attributes?.link_1 || '') + (attributes?.link_11 || ''),
      otherLink: (attributes?.link_2 || '') + (attributes?.link_22 || ''),
      actionCollection: attributes?.collection,
      mediaType: action.media_type,
      image: prepareImageURL(action.image),
    };
  });
}

function formatActionsFromDatabase(actions) {
  let tokenId = -1;

  return (actions || []).map((action) => {
    tokenId += 1;
    return {
      tokenId,
      ...action,
    };
  });
}

module.exports = {
  formatActionsFromChain,
  formatActionsFromDatabase,
};
