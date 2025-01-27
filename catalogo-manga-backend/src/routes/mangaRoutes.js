const express = require('express');
const { getAllMangas, addManga } = require('../controllers/mangaController');
const router = express.Router();

router.get('/', getAllMangas); // Listar todos os mangás
router.post('/', addManga); // Adicionar um novo mangá

module.exports = router;
