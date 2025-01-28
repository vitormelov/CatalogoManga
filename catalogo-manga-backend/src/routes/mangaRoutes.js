const express = require('express');
const { addManga, getMangas, addVolume } = require('../controllers/mangaController');

const router = express.Router();

router.post('/add', addManga); // Adicionar mangá
router.post('/add-volume', addVolume); // Rota para adicionar volume
router.get('/', getMangas); // Buscar mangás

module.exports = router;
