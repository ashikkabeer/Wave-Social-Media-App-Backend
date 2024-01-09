var express = require("express");
var router = express.Router();
let collegeControl = require("../controllers/collegeControl");
const tryCatch = require('../util/tryCatch');


router.get("/add", tryCatch(collegeControl.renderAddColleges))
router.post("/add", tryCatch(collegeControl.addCollege))
router.get("/:collegeId",tryCatch(collegeControl.collegeInfo))
module.exports = router;
