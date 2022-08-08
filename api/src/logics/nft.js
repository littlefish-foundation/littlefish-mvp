const { IPFS_SERVER_PREFIX, IPFS_FILE_PREFIX } = require('../constants');

function prepareImageURL(url) {
  return IPFS_SERVER_PREFIX + url.replace(IPFS_FILE_PREFIX, '');
}

function prepareAllImageURLsInFile(files) {
  return ([] || files).map((file) => {
    const fileToMap = JSON.parse(JSON.stringify(file));
    if (fileToMap.metadata_attributes[0].tag === '<mime_type>'
        && fileToMap.metadata_attributes[0].value.includes('image')
         && fileToMap.metadata_attributes[1].tag === '<src>') {
      fileToMap.metadata_attributes[1].value = prepareImageURL(fileToMap.metadata_attributes[1].value);
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
            tag: '<link_1>',
            value: nft.youtubeLink,
          },
          {
            tag: '<link_2>',
            value: nft.otherLink,
          },
          {
            tag: '<desc>',
            value: nft.description,
          },
          {
            tag: '<owner_name>',
            value: nft.ownerName,
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
