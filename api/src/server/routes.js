const express = require('express');
const validator = require('./middlewares/validator');

const actionController = require('./controllers/action');
const colonyController = require('./controllers/colony');
const userController = require('./controllers/user');
const actionSaleController = require('./controllers/action-sale');
const actionCategoryController = require('./controllers/action-category');
const {
  actionSchemas, colonySchemas, userSchemas, actionCategorySchemas, actionSaleSchemas,
} = require('./schemas');

const router = express.Router();

const actionRouter = express.Router();
actionRouter.route('/').get(validator(actionSchemas.getActions), actionController.getActions);
actionRouter.route('/').post(validator(actionSchemas.mintAction), actionController.mintAction);
actionRouter.route('/:id/sync-status').get(validator(actionSchemas.syncActionStatus), actionController.syncActionStatus);
actionRouter.route('/:id').get(validator(actionSchemas.getAction), actionController.getAction);
actionRouter.route('/:id').delete(validator(actionSchemas.deleteAction), actionController.deleteAction);
router.use('/action', actionRouter);

const colonyRouter = express.Router();
colonyRouter.route('/:colonyName').get(validator(colonySchemas.getColony), colonyController.getColony);
colonyRouter.route('/:colonyName').delete(validator(colonySchemas.deleteColony), colonyController.deleteColony);
colonyRouter.route('/').get(validator(colonySchemas.getColonies), colonyController.getColonies);
colonyRouter.route('/:colonyName/actions').get(validator(colonySchemas.getColonyActions), colonyController.getColonyActions);
colonyRouter.route('/').post(validator(colonySchemas.createColony), colonyController.createColony);
router.use('/colony', colonyRouter);

const userRouter = express.Router();
userRouter.route('/:walletAddress').get(validator(userSchemas.getUser), userController.getUserByWalletAddress);
userRouter.route('/:walletAddress').delete(validator(userSchemas.deleteUser), userController.deleteUserByWalletAddress);
userRouter.route('/:walletAddress/colony').post(validator(userSchemas.updateUserColony), userController.updateUserColony);
userRouter.route('/').post(validator(userSchemas.createUser), userController.createUser);
router.use('/user', userRouter);

const actionSaleRouter = express.Router();
actionSaleRouter.route('/:actionID').get(validator(actionSaleSchemas.getSaleByActionId), actionSaleController.getSaleByActionId);
actionSaleRouter.route('/:actionID').delete(validator(actionSaleSchemas.deleteSaleByActionId), actionSaleController.deleteActionSaleByActionId);
actionSaleRouter.route('/').post(validator(actionSaleSchemas.createActionSale), actionSaleController.createActionSale);
actionSaleRouter.route('/:actionID').patch(validator(actionSaleSchemas.updateSaleByActionId), actionSaleController.updateActionSaleByActionId);
router.use('/action-sale', actionSaleRouter);

const actionCategoryRouter = express.Router();
actionCategoryRouter.route('/:name').get(validator(actionCategorySchemas.getActionCategory), actionCategoryController.getActionCategory);
actionCategoryRouter.route('/:name').delete(validator(actionCategorySchemas.deleteActionCategory), actionCategoryController.deleteActionCategory);
actionCategoryRouter.route('/').get(validator(actionCategorySchemas.getActionCategories), actionCategoryController.getActionCategories);
actionCategoryRouter.route('/').post(validator(actionCategorySchemas.createActionCategory), actionCategoryController.createActionCategory);
router.use('/action-category', actionCategoryRouter);

module.exports = router;
