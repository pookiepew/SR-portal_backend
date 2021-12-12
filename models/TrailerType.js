import mongoose from "mongoose";

const trailerTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("TrailerType", trailerTypeSchema);
