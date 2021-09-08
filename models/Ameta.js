import mongoose from 'mongoose';

const ametaSchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Types.ObjectId, ref: 'Trip' },
    jobs: [{ type: mongoose.Types.ObjectId, ref: 'Job' }],
    lane: { type: mongoose.Types.ObjectId, ref: 'Lane' },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Ameta', ametaSchema);
