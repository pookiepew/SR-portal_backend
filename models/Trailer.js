import mongoose from "mongoose";

const trailerSchema = new mongoose.Schema(
  {
    license: { type: String, required: true, trim: true, uppercase: true },

    type: { type: mongoose.Types.ObjectId, ref: "TrailerType", required: true },

    location: {
      current: {
        area: { type: String, required: true, trim: true },
        areaCode: {
          type: mongoose.Types.ObjectId,
          ref: "AreaCode",
          required: true,
        },
      },
      next: {
        area: { type: String, trim: true },
        areaCode: { type: mongoose.Types.ObjectId, ref: "AreaCode" },
      },
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
    },

    specs: {
      containerlocks: Boolean,
      lashings: Boolean,
      extendable: Boolean,
      loadingramp: Boolean,
      summerTires: Boolean,
      winterTires: Boolean,
      axles: Number,
    },

    damageReports: [{ type: mongoose.Types.ObjectId, ref: "DamageReport" }],

    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],

    imgURL: { type: String, trim: true },

    // shipping: {
    //   ETD: Date,
    //   ATD: Date,
    //   ETA: Date,
    //   ATA: Date,
    //   lane: { type: mongoose.Types.ObjectId, ref: "Lane" },
    //   trip: { type: mongoose.Types.ObjectId, ref: "Trip" },
    // },

    team: {
      type: mongoose.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    // history: [
    //   {
    //     fromLocation: {
    //       area: { type: String },
    //       areaCode: {
    //         type: mongoose.Types.ObjectId,
    //         ref: "AreaCode",
    //       },
    //     },
    //     toLocation: {
    //       area: { type: String },
    //       areaCode: { type: mongoose.Types.ObjectId, ref: "AreaCode" },
    //     },
    //     shipping: {
    //       ETD: Date,
    //       ATD: Date,
    //       ETA: Date,
    //       ATA: Date,
    //       lane: { type: mongoose.Types.ObjectId, ref: "Lane" },
    //       trip: { type: mongoose.Types.ObjectId, ref: "Trip" },
    //     },
    //   },
    // ],
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Trailer", trailerSchema);
