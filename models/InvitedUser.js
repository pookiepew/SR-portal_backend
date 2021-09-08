import mongoose from 'mongoose';

const InvitedUserSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Invited User' },
    email: { type: String, required: true },
    invitedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    accepted: { type: Boolean, default: false },
    token: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('InvitedUser', InvitedUserSchema);
