import mongoose from "mongoose";

const location = new mongoose.Schema(
  {
    address: { type: String, required: true, trim: true, lowercase: true },
    postalcode: { type: String, required: true, trim: true },
    postalarea: { type: String, required: true, trim: true, lowercase: true },
    areacode: { type: mongoose.Types.ObjectId, ref: "AreaCode" },
    country: { type: String, required: true, trim: true, lowercase: true },
    geo: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Location", location);
