import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  plan: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  txid: { type: String },
  senderNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
