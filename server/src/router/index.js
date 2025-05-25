const express = require('express');
const router = express.Router();
const authRoutes = require('./authRouter.js');
const softwareRoutes = require('./softwareRouter.js');
const requestRoutes = require('./requestRouter.js');

router.use('/api/auth', authRoutes);
router.use('/api/software', softwareRoutes);
router.use('/api/requests', requestRoutes);

module.exports = router;