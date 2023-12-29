var express = require('express');
var router = express.Router();
var UserControls = require('../controllers/userControl');
const authMiddlewares = require('../middlewares/middlewares');
UserControls = new UserControls();

router.get('/', (req, res) => {
  res.redirect('/post');
});

router.post('/login', UserControls.login);
router.get('/login', authMiddlewares.isAuthenticated, UserControls.renderLogin);

router.post('/signup', UserControls.signUp);
router.get('/signup', UserControls.renderSignup);

router.get('/logout', UserControls.logout);

module.exports = router;
