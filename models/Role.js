import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    access: { type: String, required: true, trim: true, uppercase: true },
    feature: { type: String, required: true, trim: true, lowercase: true },
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Role", roleSchema);
