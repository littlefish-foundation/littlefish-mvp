const jwt = require('jsonwebtoken');
const membershipDataAccess = require('../data-access/membership');
const NotFoundError = require('../errors/not-found');
const config = require('../config');

module.exports = class AuthService {
  static async login(assets, walletAddress) {
    // to ease up tests will delete later
    if (config.disableAuth) {
      const token = jwt.sign({ assetID: 'Littlefish Test' }, config.jwtSecret, { expiresIn: '1h' });

      return {
        token,
        name: 'Littlefish Test',
      };
    }

    const membership = await membershipDataAccess.getMembership(walletAddress);
    if (!membership) {
      throw new NotFoundError(`Membership for wallet address: ${walletAddress} is not found.`);
    }

    let isAssetExist = false;
    for (let i = 0; i < membership.assets.length; i++) {
      if (membership.assetID === assets[i].policyID) {
        isAssetExist = true;
        break;
      }
    }

    if (!isAssetExist) {
      throw new NotFoundError(`Asset for wallet address: ${walletAddress} is not found.`);
    }

    const data = {
      walletAddress: membership.walletAddress,
      assetID: membership.assetID,
    };
    const token = jwt.sign(data, config.jwtSecret, { expiresIn: '1h' });

    return {
      token,
      name: membership.name,
    };
  }
};
