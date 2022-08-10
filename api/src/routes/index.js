const express = require('express');

const router = express.Router();

const actionRoutes = require('./action');

router.use('/action', actionRoutes);

module.exports = router;
