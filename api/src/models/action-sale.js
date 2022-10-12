const mongoose = require('mongoose');

const ActionSale = new mongoose.Schema({
  saleID: { type: String, required: true },
  chainActionID: { type: String, required: true },
  status: { type: String, required: true },
  paymentLink: { type: String, required: true },
  paymentAddress: { type: String, required: true },
  lastAccessed: { type: Date, required: true },
  lastAccessedWallet: { type: String },
  price: { type: Number, required: true },
  colony: { type: String, required: true },
  actionCollection: { type: String, required: true },
  action: { ref: 'Action', type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActionSale', ActionSale);
