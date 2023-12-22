var express = require("express");
var router = express.Router();
let collegeControl = require("../controllers/collegeControl");

collegeControl = new collegeControl();

router.get("/add", collegeControl.renderAddColleges)
router.post("/add", collegeControl.addCollege)


module.exports = router;
