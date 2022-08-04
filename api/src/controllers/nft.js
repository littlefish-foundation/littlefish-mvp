const nftService = require('../services/nft');

async function getNftsFromDatabase(req, res, next) {
  const {
    page, limit,
  } = req.query;

  try {
    const data = await nftService.getNftsFromDatabase(page, limit);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
}
async function getNftsFromBlokchain(req, res, next) {
  const {
    cursor, size,
  } = req.query;

  try {
    const data = await nftService.getNftsFromBlokchain(cursor, size);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
}

async function mintNft(req, res, next) {
  const {
    nft,
  } = req.body;
  let result;

  try {
    result = await nftService.mintNft(nft);
    res.status(201).send(result);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getNftsFromDatabase,
  getNftsFromBlokchain,
  mintNft,
};
