import mongoose from 'mongoose';

const company = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],

    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Company', company);
