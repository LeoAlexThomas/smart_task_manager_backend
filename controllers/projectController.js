const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModal");

//@desc Get all projects
//@route GET /api/getProjects
//@access private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  const currentProjects = projects.filter((project) =>
    project.members.some((member) => member.id === req.user.id)
  );
  console.log("Projects: ", currentProjects);
  res.status(200).json(currentProjects);
});

//@desc Get all projects
//@route GET /api/getProjects
//@access private
const createProject = asyncHandler(async (req, res) => {
    if(lodash.isEmpty(req.body)) {
        res.status(400);
        throw new Error("All Fields are required");
    }
    const currentUsers = await
    const project = await Project.create(req.body);
  });
  

module.exports = { getProjects };
