import mongoose from 'mongoose';

const requiredString = { type: String, required: true };

const deletedUser = new mongoose.Schema(
  {
    name: requiredString,
    email: requiredString,
    password: requiredString,
    roles: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
      },
    ],
    invitedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    deletedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('DeletedUser', deletedUser);
