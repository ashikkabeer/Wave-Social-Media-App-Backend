var express = require('express');
var router = express.Router();
const tryCatch = require('../util/tryCatch');
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
