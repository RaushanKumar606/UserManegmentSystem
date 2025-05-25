const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Employee routes
router.post('/', authMiddleware, roleMiddleware(['Employee']), requestController.createRequest);
router.get('/my-requests', authMiddleware, roleMiddleware(['Employee']), requestController.getUserRequests);

// Manager routes
router.get('/pending', authMiddleware, roleMiddleware(['Manager']), requestController.getPendingRequests);
router.patch('/:id', authMiddleware, roleMiddleware(['Manager']), requestController.updateRequestStatus);

module.exports = router;