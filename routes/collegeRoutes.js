//writre code documentation

var express = require("express");
var router = express.Router();
const { addCollege } = require("../controllers/collegeControl");

router.get("/addcolleges", async (req, res) => {
    res.render("addcolleges");
})
router.post("/addcolleges", async (req, res, next) => {
  try {
      const result = await addCollege(req.body);
      if (!result) {
          res.status(400).json({ error: 'Bad Request', message: 'Invalid input data' });

      } else {
          res.status(200).json({ message: 'Operation successful', data: result });
      }
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
