const express = require("express");
const router = express.Router();

// 'router.route' => used to add route for our application api
router.route("/createTask").post((req, res) => {
  res.status(201).json({ success: true, message: "Task created successfully" });
});

router.route("/getTasks").get((req, res) => {
  res.status(200).json({ success: true, message: "Tasks loaded successfully" });
});

router.route("/getTask/:id").get((req, res) => {
  res.status(200).json({
    success: true,
    message: `Task loaded successfully: ${req.params.id}`,
  });
});

router.route("/updateTask/:id").put((req, res) => {
  res.status(200).json({
    success: true,
    message: `Task updated successfully: ${req.params.id}`,
  });
});

router.route("/deleteTask/:id").delete((req, res) => {
  res.status(200).json({
    success: true,
    message: `Task delete successfully: ${req.params.id}`,
  });
});

module.exports = router;
