import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    otp: {
      type: String,
      required: [true, "email is required"],
    },
    expiresAt: {
      required:true,
      type: Date,
      default: () => new Date(Date.now() + 5 * 60 * 1000),
    },
  },
  { timestamps: true },
);

const model = mongoose.model('Otp',schema);

export default model;