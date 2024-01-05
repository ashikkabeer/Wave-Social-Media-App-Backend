var express = require('express');
var router = express.Router();
const Multer = require('multer');
let PostControls = require('../controllers/postControl');
const authMiddlewares = require('../middlewares/authMiddleware');


const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});
const tryCatch = require('../util/tryCatch');

router.use(authMiddlewares.isAuthenticated);

router.get('/:page?', tryCatch(PostControls.retrieveAll));
router.get('/upload', tryCatch(PostControls.renderUploadForm));
router.post('/upload', multer.single('image'), tryCatch(PostControls.create));
router.get('/profile-pic', tryCatch(PostControls.renderProfilePhotoForm));

module.exports = router;
