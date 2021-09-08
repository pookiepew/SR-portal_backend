import mongoose from 'mongoose';

const laneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Lane', laneSchema);
