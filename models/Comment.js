import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Comment', commentSchema);
