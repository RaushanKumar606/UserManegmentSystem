// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Public routes
// router.post('/register', authController.register);
// router.post('/login', authController.login);

// // Protected routes
// router.get('/me', authController.getCurrentUser);

// module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authController.getCurrentUser);
module.exports = router;
