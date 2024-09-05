const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  registerUser,
  loginUser,
} = require("../controllers/userControllers");
const validateToken = require("../middlewares/validateToken");

// 'router.route' => used to add route for our application api
router.route("/user/register").post(registerUser);

// NOTE: To make one route as private add the validateToken middleware like below
router.route("/user/current").get(validateToken, getCurrentUser);

router.route("/user/login").post(loginUser);

module.exports = router;
