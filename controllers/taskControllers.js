const lodash = require("lodash");
const asyncHandler = require("express-async-handler");

// NOTE: Adding asyncHandler to handle try/catch method and if exception is thrown it will be caught and handled in error handler we added in index.js file

//@desc Get all tasks
//@route GET /api/getTasks
//@access public
const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, message: "Tasks loaded successfully" });
});

//@desc Get Specific task by id
//@route GET /api/getTask/:id
//@access public
const getTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Task loaded successfully: ${req.params.id}`,
  });
});

//@desc Create task
//@route POST /api/createTask/
//@access public
const createTask = asyncHandler(async (req, res) => {
  console.log("Request Body: ", req.body);
  if (lodash.isEmpty(req.body)) {
    res.status(400);
    throw new Error("All fields are required");
  }
  res.status(201).json({ success: true, message: "Task created successfully" });
});

//@desc Update specific task by id
//@route PUT /api/updateTask/:id
//@access public
const updateTask = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: `Task updated successfully: ${req.params.id}`,
  });
});

//@desc Delete specific task by id
//@route DELETE /api/deleteTask/:id
//@access public
const deleteTask = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: `Task delete successfully: ${req.params.id}`,
  });
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
