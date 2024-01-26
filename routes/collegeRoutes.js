var express = require("express");
const tryCatch = require('../util/tryCatch');
var router = express.Router();
let collegeControl = require("../controllers/collegeControl");

router.get("/add", tryCatch(collegeControl.renderAddColleges))
router.post("/add", tryCatch(collegeControl.addCollege))
router.get("/search",tryCatch(collegeControl.searchCollegeUsingName))
router.get("/:collegeId",tryCatch(collegeControl.collegeInfo))

module.exports = router;
