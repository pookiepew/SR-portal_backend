import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    numbers: {
      SRG: { type: Number },
      LTG: { type: Number },
    },
    trip: { type: mongoose.Types.ObjectId, ref: 'Trip' },
    files: [{ type: mongoose.Types.ObjectId, ref: 'File' }],
    lane: { type: mongoose.Types.ObjectId, ref: 'Lane' },
    colli: { type: Number },
    weight: { type: Number },
    incoterms: { type: String }, // Should be a new model with reference to it.
    income: {
      SRG: { type: Number },
      LTG: { type: Number },
    },
    paper: {
      SRG: { type: Number },
      LTG: { type: Number },
    },
    haulage: {
      SRG: { type: Number },
      LTG: { type: Number },
    },
    info: { type: String },
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Job', jobSchema);
