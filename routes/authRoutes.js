var express = require('express');
const tryCatch = require('../util/tryCatch');

var router = express.Router();
let authControls = require('../controllers/authControl');

router.get('/', (req, res) => {
  res.redirect('/post');
});

router.post('/login', tryCatch(authControls.login));
router.get('/login', tryCatch(authControls.renderLogin));

router.post('/signup', tryCatch(authControls.signUp));
router.get('/signup', tryCatch(authControls.renderSignup));

router.get('/logout', tryCatch(authControls.logout));

module.exports = router;
