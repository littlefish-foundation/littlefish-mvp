const { NFT_METADATA_STANDARD, NFT_ASSET_OBJECT_PROPERTY_NAME } = require('../constants');
const { prepareImageURL } = require('../logics/nft');

function formatNftsFromChain(nfts) {
  let attributes;
  let id = -1;
  return (nfts || []).map((nft) => {
    attributes = nft.metadata[NFT_METADATA_STANDARD]?.
      [NFT_ASSET_OBJECT_PROPERTY_NAME]?.[nft.asset_name];
    id += 1;

    return {
      ...nft,
      image: prepareImageURL(nft.image),
      token_id: id,
      description: (attributes?.desc1 || '') + (attributes?.desc2 || '')
                 + (attributes?.desc3 || '') + (attributes?.desc4 || ''),
      link_1: (attributes?.link_1 || '') + (attributes?.link_11 || ''),
      link_2: (attributes?.link_2 || '') + (attributes?.link_22 || ''),
      owner_name: attributes?.owner_name,
    };
  });
}

module.exports = {
  formatNftsFromChain,
};
