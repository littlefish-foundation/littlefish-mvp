const {
  IPFS_SERVER_PREFIX, IPFS_FILE_PREFIX, ACTION_METADATA_ATTRIBUTES, ACTION_FILE_INDEXES, ACTION_MAX_ALLOWED_LENGTH,
  ADA_TO_LOVELACE_CONVERSION,
} = require('../constants');

module.exports = class ActionLogic {
  static prepareImageURL(url) {
    return IPFS_SERVER_PREFIX + url.replace(IPFS_FILE_PREFIX, '');
  }

  static prepareAllImageURLsInFile(files) {
    return ([] || files).map((file) => {
      const fileToMap = JSON.parse(JSON.stringify(file));
      if (fileToMap.metadata_attributes[ACTION_FILE_INDEXES.MIME_TYPE].tag === ACTION_METADATA_ATTRIBUTES.MIME_TYPE
          && fileToMap.metadata_attributes[ACTION_FILE_INDEXES.MIME_TYPE].value.includes(ACTION_METADATA_ATTRIBUTES.IMAGE)
          && fileToMap.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].tag === ACTION_METADATA_ATTRIBUTES.SOURCE) {
        fileToMap.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].value = this.prepareImageURL(
          fileToMap.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].value,
        );
      }
      return fileToMap;
    });
  }

  static prepareLinksToMint(links) {
    const actionLinks = [];
    const collectionLinkAttributes = {};

    links.forEach((link) => {
      if (!link.urlName || !link.url) {
        return;
      }
      const name = link.urlName.toLower();
      const url = link.url.toLower();
      const linkLength = Math.ceil(url.length / ACTION_MAX_ALLOWED_LENGTH);

      if (linkLength === 1) {
        actionLinks[name] = url;
        collectionLinkAttributes[name] = `<${name}>`;
        return;
      }

      for (let i = 0; i < linkLength; i++) {
        const linkPart = url.slice(i, i + ACTION_MAX_ALLOWED_LENGTH);
        const attributeName = `${name}_part${i + 1}`;
        actionLinks.push({
          tag: attributeName,
          value: linkPart,
        });

        collectionLinkAttributes[attributeName] = `<${attributeName}>`;
      }
    });

    return {
      actionLinks,
      collectionLinkAttributes,
    };
  }

  static prepareActionToMint(action, links) {
    return {
      tokens: [
        {
          asset_name: action.assetName,
          name: action.name,
          media_type: action.mediaType,
          image: action.image,
          ...(action.price ? { price: action.price * ADA_TO_LOVELACE_CONVERSION } : undefined),
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
              tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART1,
              value: action.description?.slice(0, ACTION_MAX_ALLOWED_LENGTH),
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART2,
              value: action.description?.slice(ACTION_MAX_ALLOWED_LENGTH, 2 * ACTION_MAX_ALLOWED_LENGTH),
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART3,
              value: action.description?.slice(ACTION_MAX_ALLOWED_LENGTH * 2, 3 * ACTION_MAX_ALLOWED_LENGTH),
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.DESCRIPTION_PART4,
              value: action.description?.slice(ACTION_MAX_ALLOWED_LENGTH * 3, 4 * ACTION_MAX_ALLOWED_LENGTH),
            },
            ...links,
          ],
        },
      ],
    };
  }
};
