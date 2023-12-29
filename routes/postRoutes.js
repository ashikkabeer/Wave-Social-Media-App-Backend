var express = require("express");
var router = express.Router();
const Multer = require("multer");
let PostControls  = require("../controllers/postControl");
const authMiddlewares = require("../middlewares/middlewares");

PostControls = new PostControls();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});
router.get("/", authMiddlewares.isAuthenticated, PostControls.retrieveAll);
router.get('/upload', authMiddlewares.isAuthenticated, PostControls.renderUploadForm);
router.post("/upload", authMiddlewares.isAuthenticated, multer.single("image"), PostControls.create);
router.get('/profile-pic', authMiddlewares.isAuthenticated, PostControls.renderProfilePhotoForm);

module.exports = router;
