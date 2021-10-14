import mongoose from 'mongoose';

const location = new mongoose.Schema(
  {
    address: { type: String, required: true },
    postalcode: { type: String, required: true },
    postalarea: { type: String, required: true },
    country: { type: String, required: true },
    geo: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Location', location);
