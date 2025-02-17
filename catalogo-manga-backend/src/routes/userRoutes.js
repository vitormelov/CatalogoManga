const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// 🔹 Criar conta
router.post('/register', createUser);

// 🔹 Login do usuário
router.post('/login', loginUser);

// 🔹 Teste para verificar se a API está rodando
router.get('/test', (req, res) => {
  res.send('🔹 API de Usuário está ativa!');
});

module.exports = router;
