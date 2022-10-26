const ACTION_METADATA_ATTRIBUTES = {
  MIME_TYPE: '<mime_type>',
  ASSET_NAME: '<asset_name>',
  NAME: '<name>',
  IMAGE: '<image>',
  SOURCE: '<src>',
  LINKS: '<links>',
  PRODUCER: '<producer>',
  DESCRIPTION: '<description>',
  TYPES: '<types>',
  COLONY: '<colony>',
  MINT_DATE: '<mint_date>',
  VERSION: '<version>',
  ID: '<id>',
  FILE_LINK: '<file_link_1>',
};
const ACTION_FILE_INDEXES = {
  MIME_TYPE: 0,
  SOURCE: 1,
};

const USER_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
};
module.exports = {
  SALE_LAST_ACCESSED_DEADLINE: 10 * 60 * 1000,
  METADATA_VERSION: '0.0.1',
  ACTION_ASSET_NAME: 'LittlefishAction',
  API_IMAGES_LINK: 'https://api.littlefish.foundation/images/',
  IPFS_SERVER_PREFIX: 'https://ipfs.io/ipfs/',
  IPFS_FILE_PREFIX: 'ipfs://',
  ACTION_METADATA_STANDARD: '721',
  ACTION_MAX_ALLOWED_LENGTH: 64,
  ADA_TO_LOVELACE_CONVERSION: 1000000,
  COLONY_ACTION_SHOWCASE_SIZE_LIMIT: 10,
  ACTION_METADATA_ATTRIBUTES,
  ACTION_FILE_INDEXES,
  USER_STATUS,
};
