var express = require('express');
const tryCatch = require('../util/tryCatch');
var router = express.Router();
var UserControls = require('../controllers/userControl');

const authMiddlewares = require('../middlewares/authMiddleware');


router.use(authMiddlewares.isAuthenticated);

router.get('/:username', tryCatch(UserControls.userInfo)); //get userinfo
router.get('/:username/edit/profile', tryCatch((req, res) => UserControls.renderEdit(req,res,'editProfile'))); // page to update profile
router.get('/:username/edit/profile/dp/', tryCatch((req, res) => UserControls.renderEdit(req,res,'editProfilePhoto'))); // page to update dp
router.get('/:username/edit/profile/cp/', tryCatch((req, res) => UserControls.renderEdit(req,res,'editCoverPhoto'))); // page to update cp

router.post('/:username/edit/profile', tryCatch(UserControls.updateProfile)); //update profile
router.post('/:username/edit/profile/dp', tryCatch(UserControls.updateProfilePicture)); //update dp
router.post('/:username/edit/profile/cp',tryCatch(UserControls.updateCoverPicture)); //update cp

module.exports = router;
