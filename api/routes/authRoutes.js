const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// URL: http://localhost:5000/auth/register
router.post('/register', register);

// URL: http://localhost:5000/auth/login
router.post('/login', login);

module.exports = router;