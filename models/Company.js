import mongoose from "mongoose";

const company = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    teams: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Team",
      },
    ],
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
    },

    creator: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Company", company);
