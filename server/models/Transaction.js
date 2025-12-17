const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  operator: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  planDetails: {
    data: String,
    validity: String,
    benefits: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);