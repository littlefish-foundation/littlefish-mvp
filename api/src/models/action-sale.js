const mongoose = require('mongoose');

const ActionSale = new mongoose.Schema({
  saleId: { type: String, required: true },
  chainActionId: { type: String, required: true },
  status: { type: String, required: true },
  paymentLink: { type: String, required: true },
  paymentAddress: { type: String, required: true },
  price: { type: Number, required: true },
  colony: { ref: 'Colony', type: mongoose.Schema.Types.ObjectId },
  action: { ref: 'Action', type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ActionSale', ActionSale);
