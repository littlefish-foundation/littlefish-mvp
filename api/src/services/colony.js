const actionService = require('./action');
const clientDataAccess = require('../data-access/client');
const colonyDataAccess = require('../data-access/colony');
const { ApiError } = require('../errors');
const s3GeneratePreSignedUrl = require('../utils/s3fileuploader');

module.exports = class ColonyService {
  static async getColony(colonyName) {
    const colony = colonyDataAccess.getColony(colonyName);

    // eslint-disable-next-line no-underscore-dangle
    const colonyMembers = await clientDataAccess.getClientsByColony(colony._id);

    // eslint-disable-next-line no-underscore-dangle
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

  static async getColonies(page, limit) {
    const colonies = await colonyDataAccess.getColonies(page, limit);

    return colonies;
  }

  static async getColonyActions(colonyName, filter = {}, sorter = {}, page = 0, limit = 10) {
    return actionService.getActions(colonyName, filter, sorter, page, limit);
  }

  static async createColony(colony) {
    // await ColonyModel.create(colony);
    console.log({ colony });
    throw new ApiError('Not authorized to create colony at this stage');
  }

  static async prepareFileLinks(files) {
    const promises = [];

    files.forEach((file) => {
      promises.push(s3GeneratePreSignedUrl(file));
    });
    return Promise.all(promises);
  }

  static async createColonyPreSignedUrls(colony) {
    const links = await prepareFileLinks(colony.files);

    return {
      links,
    };
  }
};
