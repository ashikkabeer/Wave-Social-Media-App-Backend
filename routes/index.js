const express = require('express');
const router = express.Router();
const UserRoutes = require('./userRoutes');
const PostRoutes = require('./postRoutes');
const CollegeRoutes = require('./collegeRoutes');

router.use('/user', UserRoutes);
router.use('/post', PostRoutes);
router.use('/college', CollegeRoutes);

module.exports = router;
