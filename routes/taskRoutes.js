const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getCategoryTasks,
} = require("../controllers/taskControllers");
const validateToken = require("../middlewares/validateToken");

// Adding middleware to support private routes, This method will apply middleware to all of it's routes
// router.use(validateToken);

// 'router.route' => used to add route for our application api
router.route("/task/create").post(validateToken, createTask);

router.route("/task/all").get(validateToken, getTasks);

router.route("/task/:id").get(validateToken, getTask);

router.route("/task/status/:status").get(validateToken, getCategoryTasks);

router.route("/task/update/:id").put(validateToken, updateTask);

router.route("/task/delete/:id").delete(validateToken, deleteTask);

module.exports = router;
