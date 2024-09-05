const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const lodash = require("lodash");
// NOTE: Adding asyncHandler to handle try/catch method and if exception is thrown it will be caught and handled in error handler we added in index.js file

//@desc Register new user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (
    lodash.isEmpty(userName) ||
    lodash.isEmpty(email) ||
    lodash.isEmpty(password)
  ) {
    res.status(400);
    throw new Error("All Fields are required");
  }

  const userAvailability = await User.findOne({ email });
  if (!lodash.isNil(userAvailability)) {
    res.status(400);
    throw new Error("This email is already registered");
  }

  res.status(200).json({ isSuccess: true, message: "Registered successfully" });
});

//@desc login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
    res.status(400);
    throw new Error("All Fields are required");
  }

  res.status(200).json({ isSuccess: true, message: "Logged in successfully" });
});

//@desc Get current user
//@route GET /api/user/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ isSuccess: true, message: "Logged in successfully" });
});

module.exports = { registerUser, loginUser, getCurrentUser };
