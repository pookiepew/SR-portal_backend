import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    areas: [{ type: String, trim: true, lowercase: true }],
    code: {
      type: mongoose.Types.ObjectId,
      ref: "AreaCode",
      required: true,
    },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Area", areaSchema);
