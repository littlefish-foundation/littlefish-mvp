const nftService = require('../services/nft');

async function getNftsFromDatabase(req, res) {
  const {
    page, limit,
  } = req.body;

  const data = await nftService.getNftsFromDatabase(page, limit);
  res.status(200).send(data);
}
async function getNftsFromBlokchain(req, res) {
  const {
    cursor, size,
  } = req.body;

  const data = await nftService.getNftsFromBlokchain(cursor, size);
  res.status(200).send(data);
}

async function mintNft(req, res) {
  const {
    nft,
  } = req.body;

  const result = await nftService.mintNft(nft);

  res.status(200).send(result);
}

module.exports = {
  getNftsFromDatabase,
  getNftsFromBlokchain,
  mintNft,
};
