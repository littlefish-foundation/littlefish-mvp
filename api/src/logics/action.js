const {
  IPFS_SERVER_PREFIX, IPFS_FILE_PREFIX, ACTION_METADATA_ATTRIBUTES, ACTION_FILE_INDEXES, ACTION_MAX_ALLOWED_LENGTH,
} = require('../constants');

function prepareImageURL(url) {
  return IPFS_SERVER_PREFIX + url.replace(IPFS_FILE_PREFIX, '');
}

function prepareAllImageURLsInFile(files) {
  return ([] || files).map((file) => {
    const fileToMap = JSON.parse(JSON.stringify(file));
    if (fileToMap.metadata_attributes[ACTION_FILE_INDEXES.MIME_TYPE].tag === ACTION_METADATA_ATTRIBUTES.MIME_TYPE
        && fileToMap.metadata_attributes[ACTION_FILE_INDEXES.MIME_TYPE].value.includes(ACTION_METADATA_ATTRIBUTES.IMAGE)
         && fileToMap.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].tag === ACTION_METADATA_ATTRIBUTES.SOURCE) {
      fileToMap.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].value = prepareImageURL(
        fileToMap.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].value,
      );
    }
    return fileToMap;
  });
}

function prepareActionToMint(action) {
  return {
    tokens: [
      {
        asset_name: action.assetName,
        name: action.name,
        media_type: action.mediaType,
        image: action.image,
        metadata_attributes: [
          {
            tag: ACTION_METADATA_ATTRIBUTES.OWNER_NAME,
            value: action.ownerName,
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.PRODUCER,
            value: action.ownerName,
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.COLONY_NAME,
            value: action.colonyName,
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.ACTION_TYPE,
            value: action.actionType,
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.LINK_1_FIRST64,
            value: action.youtubeLink?.slice(0, ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.LINK_1_LAST64,
            value: action.youtubeLink?.slice(ACTION_MAX_ALLOWED_LENGTH, 2 * ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.LINK_2_FIRST64,
            value: action.otherLink?.slice(0, ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.LINK_2_LAST64,
            value: action.otherLink?.slice(ACTION_MAX_ALLOWED_LENGTH, 2 * ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART1,
            value: action.otherLink?.slice(0, ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART2,
            value: action.otherLink?.slice(ACTION_MAX_ALLOWED_LENGTH, 2 * ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART3,
            value: action.otherLink?.slice(ACTION_MAX_ALLOWED_LENGTH * 2, 3 * ACTION_MAX_ALLOWED_LENGTH),
          },
          {
            tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART4,
            value: action.otherLink?.slice(ACTION_MAX_ALLOWED_LENGTH * 3, 4 * ACTION_MAX_ALLOWED_LENGTH),
          },
        ],
      },
    ],
  };
}

module.exports = {
  prepareImageURL,
  prepareAllImageURLsInFile,
  prepareActionToMint,
};
