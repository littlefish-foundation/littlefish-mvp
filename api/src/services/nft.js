const nftServiceClient = require('./nft-client');
const NftModel = require('../models/nft');
const { prepareAllImageURLsInFile, prepareImageURL } = require('../logics/nft');

async function getNftsFromBlokchain(cursor, size) {
  return nftServiceClient.getNfts(cursor, size);
}

async function getNftsFromDatabase(page = 0, limit = 10) {
  return NftModel.find().skip(page * limit).limit(limit).lean()
    .exec();
}

async function mintNft(nft) {
  const response = await nftServiceClient.mintNft(nft);

  const createdNft = response.data[0];
  console.log({ createdNft });

  const preparedFiles = prepareAllImageURLsInFile(createdNft.files);
  console.log({ preparedFiles });

  await NftModel.create({
    asset_name: createdNft.asset_name,
    nftId: createdNft.id,
    name: createdNft.name,
    fingerprint: createdNft.fingerprint,
    description: createdNft.description,
    media_type: createdNft.media_type,
    image: prepareImageURL(createdNft.image),
    status: createdNft.status,
    files: preparedFiles,
    metadata: createdNft.metadata,
    custom_attributes: createdNft.custom_attributes,
  });
  // import axios from "axios";
  //
  // const options = {
  //   method: 'POST',
  //   url: 'https://cardano-testnet.tangocrypto.com/f95871car1b0412bbe3750df46f9540e/v1/nft/collections/61844bfbb75c4782085f01fd/tokens',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': 'b4348a07f44e4700bcf19af0c6703016'
  //   },
  //   data: {
  //     tokens: [
  //       {
  //         asset_name: 'Tango01',
  //         name: 'Tango 01',
  //         description: 'If you get all tangled up, just tango on.',
  //         media_type: 'image/png',
  //         image: 'iVBORw0KGgoAAAANSU.....hEUgAADQYAAA0HCAYAAACB0xAqAAAACXBIWXMA',
  //         metadata_attributes: [
  //           {tag: '<color>', value: 'Blue'},
  //           {tag: '<body>', value: 'Skinny'},
  //           {tag: '<eyes>', value: 'Green'},
  //           {tag: '<accessory>', value: 'Keyboard'},
  //           {tag: '<face>', value: 'Rounded'}
  //         ],
  //         custom_attributes: {serial_no: 12345545, md5checksum: 'bc527343c7ffc103111f3a694b004e2f'}
  //       }
  //     ]
  //   }
  // };

  return {
    success: true,
  };
}

module.exports = {
  getNftsFromDatabase,
  getNftsFromBlokchain,
  mintNft,
};
