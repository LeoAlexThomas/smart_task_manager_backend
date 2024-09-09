const lodash = require("lodash");
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModal");
// NOTE: Adding asyncHandler to handle try/catch method and if exception is thrown it will be caught and handled in error handler we added in index.js file

//@desc Get all tasks
//@route GET /api/getTasks
//@access private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(req.query.searchText.toLowerCase())
  );
  res.status(200).json(filteredTasks);
});

//@desc Get Specific task by id
//@route GET /api/getTask/:id
//@access private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById({ _id: req.params.id });
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json(task);
});

//@desc Create task
//@route POST /api/createTask/
//@access private
const createTask = asyncHandler(async (req, res) => {
  if (lodash.isEmpty(req.body)) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const newTask = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json({
    isSuccess: true,
    message: "Task created successfully",
  });
});

//@desc Update specific task by id
//@route PUT /api/updateTask/:id
//@access private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("User don't have permission to update others task");
  }

  await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json({
    isSuccess: true,
    message: `Task updated successfully`,
  });
});

//@desc Delete specific task by id
//@route DELETE /api/deleteTask/:id
//@access private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("User don't have permission to delete others task");
  }
  await Task.deleteOne({ _id: req.params.id });
  res
    .status(201)
    .json({ isSuccess: true, message: `Task deleted successfully` });
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
