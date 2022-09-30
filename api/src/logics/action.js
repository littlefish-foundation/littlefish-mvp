const ULID = require('ulid');
const {
  IPFS_SERVER_PREFIX, IPFS_FILE_PREFIX, ACTION_METADATA_ATTRIBUTES, ACTION_FILE_INDEXES, ACTION_MAX_ALLOWED_LENGTH, ACTION_ASSET_NAME, METADATA_VERSION,
} = require('../constants');

module.exports = class ActionLogic {
  static prepareImageURL(url) {
    return IPFS_SERVER_PREFIX + url.replace(IPFS_FILE_PREFIX, '');
  }

  static prepareAllImageURLsInFile(files) {
    const preparedFiles = [];

    files?.forEach((file) => {
      if (file.metadata_attributes[ACTION_FILE_INDEXES.MIME_TYPE].tag === ACTION_METADATA_ATTRIBUTES.MIME_TYPE
          && file.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].tag === ACTION_METADATA_ATTRIBUTES.SOURCE) {
        preparedFiles.push({
          src: this.prepareImageURL(file.metadata_attributes[ACTION_FILE_INDEXES.SOURCE].value),
          type: file.metadata_attributes[ACTION_FILE_INDEXES.MIME_TYPE].value,
        });
      }
    });

    return preparedFiles;
  }

  static prepareFilesToMint(files) {
    const actionFiles = [];
    (files || []).forEach((file) => {
      actionFiles.push({
        metadata_attributes: [
          {
            value: 'image/jpeg',
            tag: ACTION_METADATA_ATTRIBUTES.MIME_TYPE,
          },
          {
            value: file,
            tag: ACTION_METADATA_ATTRIBUTES.SOURCE,
          },
        ],
      });
    });
    return actionFiles;
  }

  // split string into chunks of max length and return array of chunks
  static stringTo64CharChunks(string) {
    const chunks = [];
    for (let i = 0; i < string.length; i += ACTION_MAX_ALLOWED_LENGTH) {
      chunks.push(string.substring(i, i + ACTION_MAX_ALLOWED_LENGTH));
    }
    return chunks;
  }

  static generateUlid() {
    return ULID.ulid();
  }

  static prepareActionToMint(action, links, ulid, mintDate) {
    return {
      tokens: [
        {
          asset_name: ACTION_ASSET_NAME,
          name: action.name,
          media_type: action.mediaType,
          image: action.image,
          description: this.stringTo64CharChunks(action.description),
          files: this.prepareFilesToMint(action.files),
          metadata_attributes: [
            {
              tag: ACTION_METADATA_ATTRIBUTES.ID,
              value: ulid,
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.PRODUCER,
              value: action.walletAddress,
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.COLONY,
              value: action.colony,
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.TYPES,
              value: action.types,
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.MINT_DATE,
              value: mintDate,
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.LINKS,
              value: links,
            },
            {
              tag: ACTION_METADATA_ATTRIBUTES.VERSION,
              value: METADATA_VERSION,
            },
          ],
        },
      ],
    };
  }
};
