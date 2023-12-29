var express = require('express');
var router = express.Router();
var UserControls = require('../controllers/userControl');
const authMiddlewares = require('../middlewares/middlewares');

UserControls = new UserControls();

router.get('/:username', authMiddlewares.isAuthenticated, UserControls.info);

module.exports = router;
