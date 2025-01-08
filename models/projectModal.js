const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please add a member to this project"],
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add a default empty array to the tasks field
ProjectSchema.path("tasks").default(() => []);

module.exports = mongoose.model("Project", ProjectSchema);
