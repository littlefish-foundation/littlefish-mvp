const express = require('express');
const actionController = require('../controllers/action');
const validator = require('../middlewares/validator');
const actionSchemas = require('../schemas/action');

const router = express.Router();

router.route('/chain')
  .get(validator(actionSchemas.getActionsFromBlockchain), actionController.getActionsFromBlockchain);
router.route('/:assetName').get(validator(actionSchemas.getAction), actionController.getAction);
router.route('/:assetName').delete(validator(actionSchemas.deleteAction), actionController.deleteAction);
router.route('/').get(validator(actionSchemas.getActions), actionController.getActions);
router.route('/').post(validator(actionSchemas.mintAction), actionController.mintAction);

module.exports = router;
