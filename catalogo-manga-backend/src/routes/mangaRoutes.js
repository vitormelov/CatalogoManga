const express = require('express');
const {
  addManga,
  getMangas,
  addVolume,
  deleteManga,
  deleteVolume,
  moveMangaToCollection,
} = require('../controllers/mangaController');

const router = express.Router();

// 🔹 Adicionar mangá à coleção ou wishlist do usuário
router.post('/add', addManga);

// 🔹 Buscar todos os mangás do usuário
router.get('/:userId', getMangas);

// 🔹 Adicionar volume a um mangá do usuário
router.post('/add-volume', addVolume);

// 🔹 Deletar um mangá específico do usuário
router.delete('/delete/:userId/:mangaId', deleteManga);

// 🔹 Deletar um volume específico do usuário
router.delete('/delete-volume', deleteVolume);

// 🔹 Mover um mangá da wishlist para a coleção do usuário
router.put('/move-to-collection', moveMangaToCollection);

module.exports = router;

