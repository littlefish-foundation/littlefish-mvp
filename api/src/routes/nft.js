const express = require('express');
const nftController = require('../controllers/nft');

const router = express.Router();

router.route('/').get(nftController.getNftsFromDatabase);
router.route('/chain').get(nftController.getNftsFromBlokchain);
router.route('/').post(nftController.mintNft);

module.exports = router;
