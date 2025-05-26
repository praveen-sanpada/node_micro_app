const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/get_user_details', UserController.getUserDetails);

module.exports = router;