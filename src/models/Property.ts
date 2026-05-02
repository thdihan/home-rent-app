import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  rent: { type: Number, required: true },
  division: { type: String, required: true, default: 'Dhaka' },
  district: { type: String, required: true, default: 'Dhaka' },
  area: { type: String, required: true },
  subArea: { type: String },
  beds: { type: Number, required: true },
  bathroom: { type: Number, required: true, default: 1 },
  balcony: { type: Number, required: true },
  lift: { type: String, enum: ['yes', 'no'], default: 'no' },
  parking: { type: String, enum: ['yes', 'no'], default: 'no' },
  gas: { type: String, enum: ['prepaid', 'postpaid', 'cylinder'], default: 'cylinder' },
  images: { type: [String], default: [] }, // Array of image URLs
  // Private Data
  address: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'hidden', 'banned'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

export const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
