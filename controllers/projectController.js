const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModal");
const lodash = require("lodash");

//@desc Get all projects
//@route GET /api/getProjects
//@access private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find()
    .populate({
      path: "members",
      select: "_id name email", // NOTE: To populate selected fields only
    })
    .populate("tasks");

  const currentProjects = projects.filter((project) =>
    project.members.some((member) => member.id === req.user.id)
  );
  res.status(200).json(currentProjects);
});

//@desc Get project by id
//@route GET /api/project/:id
//@access private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById({ _id: req.params.id })
    .populate({
      path: "members",
      select: "_id name email", // NOTE: To populate selected fields only
    })
    .populate("tasks");

  if (lodash.isNil(project)) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.status(200).json(project);
});

//@desc Create new project
//@route POST /api/getProjects
//@access private
const createProject = asyncHandler(async (req, res) => {
  try {
    if (lodash.isEmpty(req.body)) {
      res.status(400);
      throw new Error("All Fields are required");
    }
    const memberIds = req.body.members;
    const { user: currentUser } = req;
    if (memberIds.length > 9) {
      res.status(400);
      throw new Error("10 Members only allowed in a single project");
    }

    const project = await Project.create({
      ...req.body,
      members: [...memberIds, currentUser._id],
    });
    res.status(200).json({
      isSuccess: true,
      message: "Project created successfully created",
      data: project,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@desc Create new project
//@route PUT /api/getProjects
//@access private
const updateProject = asyncHandler(async (req, res) => {
  try {
    const { title, description, members } = req.body;
    const projectId = req.params.id;
    if (lodash.isNil(projectId) || lodash.isEmpty(projectId)) {
      res.status(400);
      throw new Error("Project id is required");
    }
    const currentProject = await Project.findByIdAndUpdate(
      projectId,
      { title, description, members },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      isSuccess: true,
      message: "Project updated successfully",
      data: currentProject,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { getProjects, createProject, getProjectById, updateProject };
