const express = require('express');
const nftController = require('../controllers/nft');
const validator = require('../middlewares/validator');
const nftSchemas = require('../schemas/nft');

const router = express.Router();

router.route('/').get(validator(nftSchemas.getNftsFromDatabase), nftController.getNftsFromDatabase);
router.route('/chain').get(validator(nftSchemas.getNftsFromBlokchain), nftController.getNftsFromBlokchain);
router.route('/').post(validator(nftSchemas.mintNft), nftController.mintNft);

module.exports = router;
