var express = require("express");
var router = express.Router();
const College = require("../schema/college");
const { SignUp, Login, userInfo } = require("../controllers/userControl");

/* GET users listing. */

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/login");
}

router.post("/login", async (req, res, next) => {
  try {
    const sessionUser = await Login(req);
    if (sessionUser) {
      res.status(200).redirect("/");
      // res.status(200).json({message: 'LoggedIn'});
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    next(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


router.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);

    const result = await SignUp(userData);

    if (!result) {
      res.status(401).send("Failed to sign up");
    } else {
      res.status(200).send("Sign-up successful");
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    next(error);
  }
});

router.get("/getColleges", async (req, res) => {
  const college = await College.find({});
  res.send(college)
})

router.get("/signup", async (req, res, next) => {
  const college = await College.find({}); //to render colleges in the drop down
  res.render("signup", { college });
});

router.get("/login", async (req, res, next) => {
  res.render("login");
});
router.get("/userinfo/:username", isAuthenticated, async (req, res, next) => {
  try {
    const requestedUsername = req.params.username; // Use a more descriptive variable name
    const userInfo = await getUserInfo(requestedUsername); // Assuming you have a function for fetching user information

    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error while fetching user information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
