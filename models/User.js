import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    imageUrl: { type: String, trim: true },
    roles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Role",
      },
    ],
    company: { type: mongoose.Types.ObjectId, ref: "Company" },
    team: { type: mongoose.Types.ObjectId, ref: "Team" },
    invitedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    links: {
      workplace: { type: String, trim: true },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
