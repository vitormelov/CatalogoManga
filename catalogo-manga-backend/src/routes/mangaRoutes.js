const express = require('express');
const { addManga, getMangas } = require('../controllers/mangaController');

const router = express.Router();

router.post('/add', addManga); // Adicionar mangá
router.get('/', getMangas); // Buscar mangás

module.exports = router;
