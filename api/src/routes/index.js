const express = require('express');

const router = express.Router();

const nftRoutes = require('./nft');

router.use('/nft', nftRoutes);

module.exports = router;
