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
      tokenId: id,
      nftId: nft.id,
      name: nft.name,
      assetName: nft.asset_name,
      ownerName: attributes?.owner_name,
      actionType: attributes?.actionType,
      fingerprint: nft.fingerprint,
      description: (attributes?.desc1 || '') + (attributes?.desc2 || '')
      + (attributes?.desc3 || '') + (attributes?.desc4 || ''),
      youtubeLink: (attributes?.link_1 || '') + (attributes?.link_11 || ''),
      otherLink: (attributes?.link_2 || '') + (attributes?.link_22 || ''),
      collection: attributes?.collection,
      media_type: nft.media_type,
      image: prepareImageURL(nft.image),
      status: nft.status,
    };
  });
}

module.exports = {
  formatNftsFromChain,
};
