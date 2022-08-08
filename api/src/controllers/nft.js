const nftService = require('../services/nft');
const catchAsync = require('../utils/catchAsync');

const getNftsFromDatabase = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const data = await nftService.getNftsFromDatabase(page, limit);
  res.status(200).send(data);
});

const getNftsFromBlokchain = catchAsync(async (req, res) => {
  const { cursor, size } = req.query;

  const data = await nftService.getNftsFromBlokchain(cursor, size);
  res.status(200).send(data);
});

const mintNft = catchAsync(async (req, res) => {
  const result = await nftService.mintNft(req.body);
  res.status(201).send(result);
});

module.exports = {
  getNftsFromDatabase,
  getNftsFromBlokchain,
  mintNft,
};
