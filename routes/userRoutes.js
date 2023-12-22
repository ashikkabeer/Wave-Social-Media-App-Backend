var express = require("express");
var router = express.Router();
var UserControls = require("../controllers/userControl");
const authMiddlewares = require("../middlewares/middlewares");

UserControls = new UserControls();
router.post("/login",UserControls.login);
router.get("/login", UserControls.renderLogin);

router.post("/signup", UserControls.signUp)
router.get("/signup", UserControls.renderSignup);

// router.get("/getColleges", UserControls.getCollegeNames)
router.get("/:username", authMiddlewares.isAuthenticated, UserControls.info);

router.get("/logout", UserControls.logout);

module.exports = router;
