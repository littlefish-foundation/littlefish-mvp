const express = require('express');

const router = express.Router();

const actionRoutes = require('./action');
const colonyRoutes = require('./colony');

router.use('/action', actionRoutes);
router.use('/colony', colonyRoutes);

module.exports = router;
