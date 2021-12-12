import mongoose from "mongoose";

const areaCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true, uppercase: true },
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("AreaCode", areaCodeSchema);
