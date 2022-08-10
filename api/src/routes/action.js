const express = require('express');
const actionController = require('../controllers/action');
const validator = require('../middlewares/validator');
const actionSchemas = require('../schemas/action');

const router = express.Router();

// router.route('/:assetName').get(validator(actionSchemas.getAction), actionController.getAction);
router.route('/').get(validator(actionSchemas.getActionsFromDatabase), actionController.getActionsFromDatabase);
router.route('/chain').get(validator(actionSchemas.getActionsFromBlokchain), actionController.getActionsFromBlokchain);
router.route('/').post(validator(actionSchemas.mintAction), actionController.mintAction);

module.exports = router;
