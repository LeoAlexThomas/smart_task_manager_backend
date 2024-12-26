const mongoose = require("mongoose");
const { v4: uuidV4 } = require("uuid");

const ProjectSchema = mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidV4(),
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
