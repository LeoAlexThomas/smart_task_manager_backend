const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");
const validateToken = require("../middlewares/validateToken");

// Adding middleware to support private routes, This method will apply middleware to all of it's routes
// router.use(validateToken);

// 'router.route' => used to add route for our application api
router.route("/createTask").post(validateToken, createTask);

router.route("/getTasks").get(validateToken, getTasks);

router.route("/getTask/:id").get(validateToken, getTask);

router.route("/updateTask/:id").put(validateToken, updateTask);

router.route("/deleteTask/:id").delete(validateToken, deleteTask);

module.exports = router;
