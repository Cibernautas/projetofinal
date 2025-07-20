// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rota de cadastro
router.post('/cadastro', register);

// Rota de login
router.post('/login', login);

module.exports = router;
