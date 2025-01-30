const express = require('express');
const { addManga, getMangas, addVolume, deleteManga, deleteVolume, moveMangaToCollection } = require('../controllers/mangaController');

const router = express.Router();

router.post('/add', addManga); // Adicionar mangá
router.post('/add-volume', addVolume); // Rota para adicionar volume
router.get('/', getMangas); // Buscar mangás
router.delete('/delete/:mangaId', deleteManga); // Rota para deletar um mangá
router.delete('/delete-volume', deleteVolume); // Deletar volume
router.put('/move-to-collection', moveMangaToCollection);

module.exports = router;
