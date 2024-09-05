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
router.use(validateToken);

// 'router.route' => used to add route for our application api
router.route("/createTask").post(createTask);

router.route("/getTasks").get(getTasks);

router.route("/getTask/:id").get(getTask);

router.route("/updateTask/:id").put(updateTask);

router.route("/deleteTask/:id").delete(deleteTask);

module.exports = router;
