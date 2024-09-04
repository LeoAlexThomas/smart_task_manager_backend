const lodash = require("lodash");
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModal");

// NOTE: Adding asyncHandler to handle try/catch method and if exception is thrown it will be caught and handled in error handler we added in index.js file

//@desc Get all tasks
//@route GET /api/getTasks
//@access public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ isSuccess: true, data: tasks });
});

//@desc Get Specific task by id
//@route GET /api/getTask/:id
//@access public
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }
  res.status(200).json({
    isSuccess: true,
    data: task,
  });
});

//@desc Create task
//@route POST /api/createTask/
//@access public
const createTask = asyncHandler(async (req, res) => {
  if (lodash.isEmpty(req.body)) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const newTask = await Task.create(req.body);

  res.status(201).json({
    isSuccess: true,
    message: "Task created successfully",
    data: newTask,
  });
});

//@desc Update specific task by id
//@route PUT /api/updateTask/:id
//@access public
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: `Task updated successfully`,
    data: updatedTask,
  });
});

//@desc Delete specific task by id
//@route DELETE /api/deleteTask/:id
//@access public
const deleteTask = asyncHandler(async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  res
    .status(201)
    .json({ isSuccess: true, message: `Task deleted successfully` });
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
