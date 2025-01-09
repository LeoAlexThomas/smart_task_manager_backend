const lodash = require("lodash");
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModal");
const Project = require("../models/projectModal");
// NOTE: Adding asyncHandler to handle try/catch method and if exception is thrown it will be caught and handled in error handler we added in /functions/api.js file

//@desc Get all tasks
//@route GET /api/task/all/
//@access private
const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    const filteredTasks = tasks.filter((task) => {
      const querySearch = req.query.searchText;
      return (
        lodash.isNil(querySearch) ||
        task.title.toLowerCase().includes(querySearch.toLowerCase())
      );
    });
    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//@desc Get Specific task by id
//@route GET /api/task/:id/
//@access private
const getTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//@desc Create task
//@route POST /api/task/create/
//@access private
const createTask = asyncHandler(async (req, res) => {
  const taskData = req.body;
  if (lodash.isEmpty(taskData)) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // const session = await mongoose.startSession();
  // session.startTransaction();
  const project = await Project.findById({ _id: taskData.projectId });
  if (lodash.isNil(project)) {
    res.status(400);
    throw new Error("Project not found");
  }
  try {
    const task = new Task({ ...taskData, ownerId: req.user.id });
    await task.save();
    // const savedTask = task.save({ session });
    // await project.findByIdAndUpdate(
    //   taskData.projectId,
    //   { $push: { tasks: savedTask._id } },
    //   { session }
    // );

    // await session.commitTransaction();
    // session.endSession();
    // const newTask = await Task.create({ ...taskData, ownerId: req.user.id });
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json({
      isSuccess: true,
      message: "Task created successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500);
    throw new Error(error);
  }
});

//@desc Update specific task by id
//@route PUT /api/task/update/:id/
//@access private
const updateTask = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//@desc Delete specific task by id
//@route DELETE /api/task/delete/:id/
//@access private
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("User don't have permission to delete others task");
    }
    await Task.deleteOne({ _id: req.params.id });
    res
      .status(201)
      .json({ isSuccess: true, message: `Task deleted successfully` });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
