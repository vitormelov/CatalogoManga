const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// 🔹 Log para verificar se as rotas estão sendo carregadas
console.log('🔄 Carregando rotas de usuários...');

// 🔹 Criar conta
router.post('/register', (req, res, next) => {
  console.log('📩 Requisição recebida em /register');
  next();
}, createUser);

// 🔹 Login
router.post('/login', (req, res, next) => {
  console.log('📩 Requisição recebida em /login');
  next();
}, loginUser);

console.log('✅ Rotas de usuários carregadas!');

module.exports = router;
