const express = require('express');
const userController = require('../controllers/user');
const validator = require('../middlewares/validator');
const userSchemas = require('../schemas/user');

const router = express.Router();

router.route('/:walletAddress').get(validator(userSchemas.getUser), userController.getUser);
router.route('/:walletAddress').delete(validator(userSchemas.deleteUser), userController.deleteUser);
router.route('/').post(validator(userSchemas.createUser), userController.createUser);
router.route('/:walletAddress/colony').post(validator(userSchemas.updateUserColony), userController.updateUserColony);

module.exports = router;
