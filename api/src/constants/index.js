const NFT_METADATA_ATTRIBUTES = {
  MIME_TYPE: '<mime_type>',
  IMAGE: 'image',
  SOURCE: '<src>',
  LINK_1_FIRST64: '<link_1>',
  LINK_1_LAST64: '<link_11>',
  LINK_2_FIRST64: '<link_2>',
  LINK_2_LAST64: '<link_22>',
  DESCRIPTION_PART1: '<desc1>',
  DESCRIPTION_PART2: '<desc2>',
  DESCRIPTION_PART3: '<desc3>',
  DESCRIPTION_PART4: '<desc4>',
  OWNER_NAME: '<owner_name>',

};
const NFT_FILE_INDEXES = {
  MIME_TYPE: 0,
  SOURCE: 1,
};

module.exports = {
  IPFS_SERVER_PREFIX: 'https://ipfs.io/ipfs/',
  IPFS_FILE_PREFIX: 'ipfs://',
  NFT_METADATA_STANDARD: '721',
  NFT_ASSET_OBJECT_PROPERTY_NAME: '43d0fdf3a1fbda50b3db584d14e6a6b63d0781cf0666ad289be0cb70',
  NFT_METADATA_ATTRIBUTES,
  NFT_FILE_INDEXES,
  NFT_MAX_ALLOWED_LENGTH: 64,
};
