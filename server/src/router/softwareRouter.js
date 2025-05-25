const express = require('express');
const router = express.Router();
const softwareController = require('../controllers/softwareController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/', authMiddleware,softwareController.createSoftware);

router.get('/', softwareController.getAllSoftware);
router.get('/:id', softwareController.getSoftwareById);
router.put('/:id', softwareController.updateSoftware);
router.delete('/:id', softwareController.deleteSoftware);

module.exports = router;
