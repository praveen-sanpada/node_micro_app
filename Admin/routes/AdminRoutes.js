const express = require('express');

const AdminController = require('../controllers/AdminController');

const router = express.Router();

router.post('/get_admin_details', AdminController.getAdminDetails);

module.exports = router;