const express = require('express');

const DetectionController = require('../controllers/DetectionController');

const router = express.Router();

router.post('/get_detection_details', DetectionController.getDetectionDetails);

module.exports = router;