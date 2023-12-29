const express = require('express');
const router = express.Router();
const UserRoutes = require('./userRoutes');
const PostRoutes = require('./postRoutes');
const CollegeRoutes = require('./collegeRoutes');
const authRouter = require('./authRoutes')

router.use('/',authRouter)
router.use('/user', UserRoutes);
router.use('/post', PostRoutes);
router.use('/college', CollegeRoutes)

module.exports = router;
