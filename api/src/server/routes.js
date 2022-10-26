/* eslint-disable max-len */

const express = require('express');
const validator = require('./middlewares/validator');
const authenticator = require('./middlewares/authenticator');

const actionController = require('./controllers/action');
const colonyController = require('./controllers/colony');
const userController = require('./controllers/user');
const actionSaleController = require('./controllers/action-sale');
const actionTypeController = require('./controllers/action-type');
const colonyShowcaseActionController = require('./controllers/colony-showcase-action');
const authController = require('./controllers/auth');
const {
  actionSchemas, colonySchemas, userSchemas, actionTypeSchemas, actionSaleSchemas, authSchemas, colonyShowcaseActionSchemas,
} = require('./schemas');

const router = express.Router();

const auth = express.Router();
auth.route('/login').post(validator(authSchemas.login), authController.login);
router.use('/', auth);

const actionRouter = express.Router();
actionRouter.route('/').get(validator(actionSchemas.getActions), actionController.getActions);
actionRouter.route('/').post(authenticator, validator(actionSchemas.mintAction), actionController.mintAction);
actionRouter.route('/:id/sync-status').patch(validator(actionSchemas.syncActionStatus), actionController.syncActionStatus);
actionRouter.route('/:id').get(validator(actionSchemas.getAction), actionController.getAction);
actionRouter.route('/:id').delete(validator(actionSchemas.deleteAction), actionController.deleteAction);
actionRouter.route('/hook').post(actionController.syncActionWebhook);
router.use('/action', actionRouter);

const colonyRouter = express.Router();
colonyRouter.route('/').get(validator(colonySchemas.getColonies), colonyController.getColonies);
colonyRouter.route('/:colonyName/parent-and-subs').get(validator(colonySchemas.getParentSubColonies), colonyController.getParentSubColonies);
colonyRouter.route('/').post(validator(colonySchemas.createColony), colonyController.createColony);
colonyRouter.route('/:colonyName').get(validator(colonySchemas.getColony), colonyController.getColony);
colonyRouter.route('/:colonyName').delete(validator(colonySchemas.deleteColony), colonyController.deleteColony);
colonyRouter.route('/:colonyName/actions').get(validator(colonySchemas.getColonyActions), colonyController.getColonyActions);
router.use('/colony', colonyRouter);

const userRouter = express.Router();
userRouter.route('/').get(validator(userSchemas.getUsers), userController.getUsers);
userRouter.route('/:name').get(validator(userSchemas.getUser), userController.getUserByName);
userRouter.route('/:name').delete(validator(userSchemas.deleteUser), userController.deleteUserByName);
userRouter.route('/:name/colony').post(validator(userSchemas.updateUserColony), userController.updateUserColony);
userRouter.route('/').post(validator(userSchemas.createUser), userController.createUser);
router.use('/user', userRouter);

const actionSaleRouter = express.Router();
actionSaleRouter.route('/:actionID').get(validator(actionSaleSchemas.getSaleByActionID), actionSaleController.getSaleByActionID);
actionSaleRouter.route('/:actionID').delete(validator(actionSaleSchemas.deleteSaleByActionID), actionSaleController.deleteActionSaleByActionID);
actionSaleRouter.route('/:actionID').patch(validator(actionSaleSchemas.updateSaleByActionID), actionSaleController.updateActionSaleByActionID);
actionSaleRouter.route('/').post(validator(actionSaleSchemas.createActionSale), actionSaleController.createActionSale);
router.use('/action-sale', actionSaleRouter);

const actionTypeRouter = express.Router();
actionTypeRouter.route('/popular').get(validator(actionTypeSchemas.getPopularActionTypes), actionTypeController.getPopularActionTypes);
actionTypeRouter.route('/:name').get(validator(actionTypeSchemas.getActionType), actionTypeController.getActionType);
actionTypeRouter.route('/:name').delete(validator(actionTypeSchemas.deleteActionType), actionTypeController.deleteActionType);
actionTypeRouter.route('/').get(validator(actionTypeSchemas.getActionTypes), actionTypeController.getActionTypes);
actionTypeRouter.route('/').post(validator(actionTypeSchemas.createActionType), actionTypeController.createActionType);
router.use('/action-type', actionTypeRouter);

const colonyShowcaseActionRouter = express.Router();
colonyShowcaseActionRouter.route('/:colonyName').get(validator(colonyShowcaseActionSchemas.getShowcase), colonyShowcaseActionController.getShowcase);
colonyShowcaseActionRouter.route('/:colonyName/action').delete(validator(colonyShowcaseActionSchemas.deleteActionFromShowcase), colonyShowcaseActionController.deleteActionFromShowcase);
colonyShowcaseActionRouter.route('/:colonyName').delete(validator(colonyShowcaseActionSchemas.deleteShowcaseByColony), colonyShowcaseActionController.deleteShowcaseByColony);
colonyShowcaseActionRouter.route('/:colonyName').post(validator(colonyShowcaseActionSchemas.addActionToShowcase), colonyShowcaseActionController.addActionToShowcase);

module.exports = router;
