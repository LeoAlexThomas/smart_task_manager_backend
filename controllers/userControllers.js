const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const lodash = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// NOTE: Adding asyncHandler to handle try/catch method and if exception is thrown it will be caught and handled in error handler we added in /functions/api.js file

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

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    userName,
    email,
    password: hashedPassword, // NOTE: Storing  hashed password instead of storing real password due user security issues
  });

  const accessToken = await getAccessToken({
    userId: createdUser.id,
    userEmail: createdUser.email,
  });

  res.status(200).json({
    isSuccess: true,
    message: "Registered successfully",
    data: {
      userName: createdUser.userName,
      email: createdUser.email,
      accessToken,
    },
  });
});

const getAccessToken = async (payload) => {
  return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
};

//@desc login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
    res.status(400);
    throw new Error("All Fields are required");
  }

  const user = await User.findOne({ email });
  if (lodash.isNil(user) || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Email / password is incorrect");
  }

  const accessToken = await getAccessToken({
    userId: user.id,
    userEmail: user.email,
  });
  res.status(200).json({
    isSuccess: true,
    message: "Logged in successfully",
    data: {
      accessToken,
    },
  });
});

//@desc Get current user
//@route GET /api/user/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    isSuccess: true,
    data: {
      userName: req.user.userName,
      userEmail: req.user.email,
    },
  });
});

module.exports = { registerUser, loginUser, getCurrentUser };
