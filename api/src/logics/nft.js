const {
  IPFS_SERVER_PREFIX, IPFS_FILE_PREFIX, NFT_METADATA_ATTRIBUTES, NFT_FILE_INDEXES, NFT_MAX_ALLOWED_LENGTH,
} = require('../constants');

function prepareImageURL(url) {
  return IPFS_SERVER_PREFIX + url.replace(IPFS_FILE_PREFIX, '');
}

function prepareAllImageURLsInFile(files) {
  return ([] || files).map((file) => {
    const fileToMap = JSON.parse(JSON.stringify(file));
    if (fileToMap.metadata_attributes[NFT_FILE_INDEXES.MIME_TYPE].tag === NFT_METADATA_ATTRIBUTES.MIME_TYPE
        && fileToMap.metadata_attributes[NFT_FILE_INDEXES.MIME_TYPE].value.includes(NFT_METADATA_ATTRIBUTES.IMAGE)
         && fileToMap.metadata_attributes[NFT_FILE_INDEXES.SOURCE].tag === NFT_METADATA_ATTRIBUTES.SOURCE) {
      fileToMap.metadata_attributes[NFT_FILE_INDEXES.SOURCE].value = prepareImageURL(
        fileToMap.metadata_attributes[NFT_FILE_INDEXES.SOURCE].value,
      );
    }
    return fileToMap;
  });
}

function prepareNftToMint(nft) {
  return {
    tokens: [
      {
        asset_name: nft.assetName,
        name: nft.name,
        media_type: nft.mediaType,
        image: nft.image,
        metadata_attributes: [
          {
            tag: NFT_METADATA_ATTRIBUTES.OWNER_NAME,
            value: nft.ownerName,
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.ACTION_TYPE,
            value: nft.actionType,
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.LINK_1_FIRST64,
            value: nft.youtubeLink?.slice(0, NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.LINK_1_LAST64,
            value: nft.youtubeLink?.slice(NFT_MAX_ALLOWED_LENGTH, 2 * NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.LINK_2_FIRST64,
            value: nft.otherLink?.slice(0, NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.LINK_2_LAST64,
            value: nft.otherLink?.slice(NFT_MAX_ALLOWED_LENGTH, 2 * NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.DESCRIPTION_PART1,
            value: nft.otherLink?.slice(0, NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.DESCRIPTION_PART2,
            value: nft.otherLink?.slice(NFT_MAX_ALLOWED_LENGTH, 2 * NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.DESCRIPTION_PART3,
            value: nft.otherLink?.slice(NFT_MAX_ALLOWED_LENGTH * 2, 3 * NFT_MAX_ALLOWED_LENGTH),
          },
          {
            tag: NFT_METADATA_ATTRIBUTES.DESCRIPTION_PART4,
            value: nft.otherLink?.slice(NFT_MAX_ALLOWED_LENGTH * 3, 4 * NFT_MAX_ALLOWED_LENGTH),
          },
        ],
      },
    ],
  };
}

module.exports = {
  prepareImageURL,
  prepareAllImageURLsInFile,
  prepareNftToMint,
};
