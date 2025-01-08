const mongoose = require("mongoose");
const User = require("../models/userModal");

const taskSchema = mongoose.Schema(
  {
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
      enum: ["low", "medium", "high"],
      required: [true, "Please give priority level for task"],
    },
    location: {
      type: String,
      required: [true, "Please give location for task"],
    },
    status: {
      type: String,
      enum: ["todo", "inProcess", "completed", "blocked"],
      default: "todo",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedDate: { type: String, default: null },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please give user id who is creating this task"],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Please give project id"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
