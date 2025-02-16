const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Rotas de autenticação
router.post('/register', createUser); // Criar conta
router.post('/login', loginUser); // Login

module.exports = router;