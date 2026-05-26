const mongoose = require("mongoose")

const timeLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    startTime: Date,

    endTime: Date,

    duration: Number,
  },
  { timestamps: true }
)

module.exports = mongoose.model("TimeLog", timeLogSchema)