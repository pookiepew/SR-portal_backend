import mongoose from 'mongoose';

const trailerSchema = new mongoose.Schema(
  {
    regNumber: { type: String, required: true },

    type: { type: mongoose.Types.ObjectId, ref: 'TrailerType', required: true },

    currentLocation: {
      area: { type: String, required: true },
      areaCode: {
        type: mongoose.Types.ObjectId,
        ref: 'AreaCode',
        required: true,
      },
    },
    nextLocation: {
      area: { type: String },
      areaCode: { type: mongoose.Types.ObjectId, ref: 'AreaCode' },
    },
    geoLocation: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    specs: {
      containerlocks: Boolean,
      lashings: Boolean,
      extendable: Boolean,
      loadingramp: Boolean,
      axles: Number,
      tires: String,
    },
    damageReports: [{ type: mongoose.Types.ObjectId, ref: 'DamageReport' }],
    notes: String,
    imgURL: String,
    shipping: {
      ETD: Date,
      ATD: Date,
      ETA: Date,
      ATA: Date,
      lane: { type: mongoose.Types.ObjectId, ref: 'Lane' },
      trip: { type: mongoose.Types.ObjectId, ref: 'Trip' },
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    history: [
      {
        fromLocation: {
          area: { type: String },
          areaCode: {
            type: mongoose.Types.ObjectId,
            ref: 'AreaCode',
          },
        },
        toLocation: {
          area: { type: String },
          areaCode: { type: mongoose.Types.ObjectId, ref: 'AreaCode' },
        },
        shipping: {
          ETD: Date,
          ATD: Date,
          ETA: Date,
          ATA: Date,
          lane: { type: mongoose.Types.ObjectId, ref: 'Lane' },
          trip: { type: mongoose.Types.ObjectId, ref: 'Trip' },
        },
      },
    ],
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Trailer', trailerSchema);
