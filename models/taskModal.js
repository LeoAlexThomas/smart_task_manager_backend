const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: [true, "Please give title for task"] },
    description: {
      type: String,
      required: [true, "Please give description for task"],
    },
    endDate: {
      type: String,
      required: [true, "Please give End-Date for task"],
    },
    priorityLevel: {
      type: String,
      required: [true, "Please give priority level for task"],
    },
    location: {
      type: String,
      required: [true, "Please give location for task"],
    },
    isCompleted: {
      type: String,
      required: [true, "Please check task completed or not"],
    },
    completedDate: { type: String, required: [false] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
