const mongoose = require("mongoose");

const testReportSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    testName: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: String,
      required: true,
      enum: ["Pass", "Fail"],
      default: "Pass",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestReport", testReportSchema);