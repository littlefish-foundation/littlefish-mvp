const express = require('express');
const colonyController = require('../controllers/colony');
const validator = require('../middlewares/validator');
const colonySchemas = require('../schemas/colony');

const router = express.Router();

router.route('/:colonyName').get(validator(colonySchemas.getColony), colonyController.getColony);
router.route('/').get(validator(colonySchemas.getColonies), colonyController.getColonies);
router.route('/:colonyName/actions').get(validator(colonySchemas.getColonyActions), colonyController.getColonyActions);
router.route('/').post(validator(colonySchemas.createColony), colonyController.createColony);
router.route('/presigned-urls')
  .post(validator(colonySchemas.createColonyPreSignedUrls), colonyController.createColonyPreSignedUrls);

module.exports = router;
