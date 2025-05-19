const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');

// Route to login admin (POST /api/auth/login)
router.post('/login', loginAdmin);

// (Optional) Route to register admin (POST /api/auth/register)
router.post('/register', registerAdmin);

module.exports = router;
