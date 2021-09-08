import mongoose from 'mongoose';

const requiredString = { type: String, required: true };

const userSchema = new mongoose.Schema(
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
    company: { type: mongoose.Types.ObjectId, ref: 'Company' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
