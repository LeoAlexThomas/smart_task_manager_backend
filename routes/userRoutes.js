const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  registerUser,
  loginUser,
} = require("../controllers/userControllers");

// 'router.route' => used to add route for our application api
router.route("/user/register").post(registerUser);

router.route("/user/current").get(getCurrentUser);

router.route("/user/login").put(loginUser);

module.exports = router;
