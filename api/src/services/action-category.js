const actionCategoryDataAccess = require('../data-access/action-category');
const { NotFoundError } = require('../errors');

module.exports = class ActionCategoryService {
  static async getActionCategory(name) {
    const actionCategory = await actionCategoryDataAccess.getActionCategory(name);

    if (!actionCategory) {
      throw new NotFoundError(`Category for name: ${name} is not found.`);
    }
    return actionCategory;
  }

  static async deleteCategory(name) {
    const success = await actionCategoryDataAccess.deleteCategory(name);

    return {
      success,
    };
  }

  static async createActionCategory(actionCategory) {
    // TODO createActionCategory response
    await actionCategoryDataAccess.createActionCategory(actionCategory);

    return {
      success: true,
    };
  }

  static async getActionCategories(page, limit) {
    // TODO resp
    const actionCategories = await actionCategoryDataAccess.getActionCategories(page, limit);

    return {
      actionCategories,
    };
  }
};
