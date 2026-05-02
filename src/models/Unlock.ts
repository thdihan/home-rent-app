import mongoose from 'mongoose';

const unlockSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  unlockedAt: { type: Date, default: Date.now },
});

export const Unlock = mongoose.models.Unlock || mongoose.model('Unlock', unlockSchema);
