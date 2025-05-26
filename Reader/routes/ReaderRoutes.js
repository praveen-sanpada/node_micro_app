const express = require('express');

const ReaderController = require('../controllers/ReaderController');

const router = express.Router();

router.post('/get_reader_details', ReaderController.getReaderDetails);

module.exports = router;