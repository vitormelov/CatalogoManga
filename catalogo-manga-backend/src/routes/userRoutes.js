const express = require('express');
const {
  createUser,
  loginUser,
  getMangas,
  addManga,
  deleteManga,
  addVolume,
  deleteVolume,
  moveMangaToCollection
} = require('../controllers/userController');

const router = express.Router();

console.log('🔄 Carregando rotas de usuários...');

// 🟢 Criar conta
router.post('/register', (req, res, next) => {
  console.log('📩 Requisição recebida em /register');
  next();
}, createUser);

// 🟢 Login
router.post('/login', (req, res, next) => {
  console.log('📩 Requisição recebida em /login');
  next();
}, loginUser);

// 🟢 Buscar mangás (wishlist ou coleção)
router.get('/:userId/mangas/:listType', (req, res, next) => {
  console.log(`📩 Requisição recebida para buscar ${req.params.listType} de usuário: ${req.params.userId}`);
  next();
}, getMangas);

// 🟢 Adicionar mangá ao usuário
router.post('/:userId/add-manga', (req, res, next) => {
  console.log(`📩 Adicionando mangá para usuário: ${req.params.userId}`);
  next();
}, addManga);

// 🟢 Deletar um mangá do usuário
router.delete('/:userId/delete-manga', (req, res, next) => {
  console.log(`🗑️ Deletando mangá para usuário: ${req.params.userId}`);
  next();
}, deleteManga);

// 🟢 Adicionar volume a um mangá
router.post('/:userId/add-volume', (req, res, next) => {
  console.log(`📩 Adicionando volume para usuário: ${req.params.userId}`);
  next();
}, addVolume);

// 🟢 Deletar um volume de um mangá
router.delete('/:userId/delete-volume', (req, res, next) => {
  console.log(`🗑️ Deletando volume para usuário: ${req.params.userId}`);
  next();
}, deleteVolume);

// 🟢 Mover mangá da wishlist para coleção
router.put('/:userId/move-to-collection', (req, res, next) => {
  console.log(`📩 Movendo mangá para coleção do usuário: ${req.params.userId}`);
  next();
}, moveMangaToCollection);

console.log('✅ Rotas de usuários carregadas!');

module.exports = router;
