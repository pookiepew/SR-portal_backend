import mongoose from 'mongoose';

const team = new mongoose.Schema(
  {
    name: { type: String, required: true },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    location: { type: mongoose.Types.ObjectId, ref: 'Location' },

    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Team', team);
