const express = require('express');
const { addManga, getMangas, addVolume, deleteManga, deleteVolume } = require('../controllers/mangaController');

const router = express.Router();

router.post('/add', addManga);
router.get('/', getMangas);
router.post('/add-volume', addVolume);
router.delete('/delete/:userId/:mangaId', deleteManga);
router.delete('/delete-volume', deleteVolume);

module.exports = router;
