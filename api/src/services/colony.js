const actionService = require('./action');
const userDataAccess = require('../data-access/user');
const colonyDataAccess = require('../data-access/colony');
const s3GeneratePreSignedUrl = require('../utils/s3fileuploader');

module.exports = class ColonyService {
  static async getColony(colonyName) {
    const colony = colonyDataAccess.getColony(colonyName);

    const colonyMembers = await userDataAccess.getUsersByColony(colony._id);

    delete colony._id;
    colony.members = colonyMembers;

    return colony;
  }

  static async deleteColony(colonyName) {
    const success = await colonyDataAccess.deleteColony(colonyName);

    return {
      success,
    };
  }

  static async getColonies(page = 0, limit = 10) {
    return colonyDataAccess.getColonies(page, limit);
  }

  static async getColonyActions(colonyName, filter = {}, sorter = {}, page = 0, limit = 10) {
    return actionService.getActions(colonyName, filter, sorter, page, limit);
  }

  static async createColony(colony) {
    await colonyDataAccess.createColony(colony);

    return {
      success: true,
    };
  }

  static async prepareFileLinks(files) {
    const promises = [];

    files.forEach((file) => {
      promises.push(s3GeneratePreSignedUrl(file.name, file.type));
    });
    return Promise.all(promises);
  }

  static async createColonyPreSignedUrls(colony) {
    const links = await this.prepareFileLinks(colony.files);

    return {
      links,
    };
  }
};
