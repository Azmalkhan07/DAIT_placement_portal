const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    eligibility: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Upcoming", "Open", "Closed"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Drive", driveSchema);