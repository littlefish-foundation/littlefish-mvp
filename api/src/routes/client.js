const express = require('express');
const clientController = require('../controllers/client');
const validator = require('../middlewares/validator');
const clientSchemas = require('../schemas/client');

const router = express.Router();

router.route('/:walletAddress').get(validator(clientSchemas.getClient), clientController.getClient);
router.route('/:walletAddress').delete(validator(clientSchemas.deleteClient), clientController.deleteClient);
router.route('/').post(validator(clientSchemas.createClient), clientController.createClient);

module.exports = router;
