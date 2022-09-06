const express = require('express');
const validator = require('./middlewares/validator');

const actionController = require('./controllers/action');
const colonyController = require('./controllers/colony');
const userController = require('./controllers/user');
const actionSaleController = require('./controllers/action-sale');
const actionTypeController = require('./controllers/action-type');
const {
  actionSchemas, colonySchemas, userSchemas, actionTypeSchemas, actionSaleSchemas,
} = require('./schemas');

const router = express.Router();

const actionRouter = express.Router();
actionRouter.route('/').get(validator(actionSchemas.getActions), actionController.getActions);
actionRouter.route('/').post(validator(actionSchemas.mintAction), actionController.mintAction);
actionRouter.route('/:id/sync-status').patch(validator(actionSchemas.syncActionStatus), actionController.syncActionStatus);
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

const actionTypeRouter = express.Router();
actionTypeRouter.route('/popular').get(validator(actionTypeSchemas.getPopularActionTypes), actionTypeController.getPopularActionTypes);
actionTypeRouter.route('/:name').get(validator(actionTypeSchemas.getActionType), actionTypeController.getActionType);
actionTypeRouter.route('/:name').delete(validator(actionTypeSchemas.deleteActionType), actionTypeController.deleteActionType);
actionTypeRouter.route('/').get(validator(actionTypeSchemas.getActionTypes), actionTypeController.getActionTypes);
actionTypeRouter.route('/').post(validator(actionTypeSchemas.createActionType), actionTypeController.createActionType);
router.use('/action-type', actionTypeRouter);

module.exports = router;
