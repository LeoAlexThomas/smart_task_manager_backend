const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
} = require("../controllers/projectController");
const validateToken = require("../middlewares/validateToken");

router.route("/project/all").get(validateToken, getProjects);

router.route("/project/create").post(validateToken, createProject);

module.exports = router;
