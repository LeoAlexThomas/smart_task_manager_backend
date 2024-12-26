const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModal");
const lodash = require("lodash");

//@desc Get all projects
//@route GET /api/getProjects
//@access private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate("members");

  const currentProjects = projects.filter((project) =>
    project.members.some((member) => {
      console.log("Member id: ", member._id);
      return member.id === req.user.id;
    })
  );
  console.log("Projects: ", currentProjects, projects);
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
  const members = req.body.members;
  if (lodash.isNil(members) || lodash.isEmpty(members)) {
    res.status(400);
    throw new Error("Members should be added to the project");
  }

  if (members.length > 10) {
    res.status(400);
    throw new Error("10 Members only allowed in a single project");
  }

  const project = await Project.create(req.body);
  res.status(200).json({
    isSuccess: true,
    message: "Project created successfully created",
  });
});

module.exports = { getProjects, createProject };
