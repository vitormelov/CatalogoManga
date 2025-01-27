const Manga = require('../models/Manga');

// Listar todos os mangás
const getAllMangas = async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar mangás.' });
  }
};

// Adicionar um novo mangá
const addManga = async (req, res) => {
  try {
    const newManga = new Manga(req.body);
    await newManga.save();
    res.status(201).json(newManga);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar mangá.' });
  }
};

module.exports = { getAllMangas, addManga };
