import mongoose from 'mongoose';

const damageReport = new mongoose.Schema(
  {
    report: { type: String },
    images: [{ type: String }],
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('DamageReport', damageReport);
