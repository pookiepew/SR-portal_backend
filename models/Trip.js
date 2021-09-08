import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    numbers: {
      SRG: { type: Number },
      LTG: { type: Number },
    },
    departureDate: { type: Date },
    arrivalDate: { type: Date },
    jobs: [{ type: mongoose.Types.ObjectId, ref: 'Job' }],
    lane: { type: mongoose.Types.ObjectId, ref: 'Lane' },
    done: { type: Boolean, default: false },
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Trip', tripSchema);
