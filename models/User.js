import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
    roles: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
      },
    ],
    company: { type: mongoose.Types.ObjectId, ref: 'Company' },
    team: { type: mongoose.Types.ObjectId, ref: 'Team' },
    invitedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    links: {
      workplace: { type: String },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
