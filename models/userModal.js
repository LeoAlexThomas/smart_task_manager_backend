const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please give user name"],
    },
    email: {
      type: String,
      required: [true, "Please give email address"],
      unique: [true, "This Email Address is already in use"],
    },
    password: {
      type: String,
      required: [true, "Please give password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
