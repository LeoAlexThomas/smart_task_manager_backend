const express = require("express");
const router = express.Router();
const { getProjects } = require("../controllers/projectController");
const validateToken = require("../middlewares/validateToken");

router.route("/getProjects").get(validateToken, getProjects);

module.exports = router;
