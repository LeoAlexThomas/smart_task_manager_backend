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

//@desc Create new project
//@route POST /api/getProjects
//@access private
const createProject = asyncHandler(async (req, res) => {
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
});

module.exports = { getProjects, createProject };
