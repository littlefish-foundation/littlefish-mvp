const express = require('express');
const actionController = require('../controllers/action');
const validator = require('../middlewares/validator');
const actionSchemas = require('../schemas/action');

const router = express.Router();

router.route('/chain')
  .get(validator(actionSchemas.getActionsFromBlockchain), actionController.getActionsFromBlockchain);
router.route('/sales').get(validator(actionSchemas.getSales), actionController.getSales);
router.route('/').get(validator(actionSchemas.getActions), actionController.getActions);
router.route('/').post(validator(actionSchemas.mintAction), actionController.mintAction);
router.route('/collection').post(actionController.createActionCollection);
router.route('/sale/:assetName').post(validator(actionSchemas.createActionSale), actionController.createActionSale);
router.route('/sale/:assetName/').get(validator(actionSchemas.getSale), actionController.getSale);
router.route('/:assetName').get(validator(actionSchemas.getAction), actionController.getAction);
router.route('/:assetName').delete(validator(actionSchemas.deleteAction), actionController.deleteAction);

module.exports = router;
