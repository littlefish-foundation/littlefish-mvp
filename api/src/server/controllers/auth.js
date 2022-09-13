const authService = require('../../services/auth');
const catchAsync = require('../../utils/catch-async');

module.exports = class AuthController {
  static login = catchAsync(async (req, res) => {
    const { assets, walletAddress } = req.body;
    const data = await authService.login(assets, walletAddress);
    return res.status(200).send(data);
  });
};
