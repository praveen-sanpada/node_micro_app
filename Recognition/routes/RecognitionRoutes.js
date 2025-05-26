const express = require('express');

const RecognitionController = require('../controllers/RecognitionController');

const router = express.Router();

router.post('/get_recognition_details', RecognitionController.getRecognitionDetails);

module.exports = router;