const Manga = require('../models/Manga');

// Adicionar mangá à coleção ou lista de desejos
const addManga = async (req, res) => {
  try {
    const { userId, mal_id, title, images, rank, popularity, published, volumes, chapters, listType } = req.body;

    const existingManga = await Manga.findOne({ userId, mal_id, listType });
    if (existingManga) {
      return res.status(400).json({ message: 'Mangá já está nesta lista.' });
    }

    const newManga = new Manga({
      userId,
      mal_id,
      title,
      images,
      rank,
      popularity,
      published,
      volumes,
      chapters,
      listType,
    });

    await newManga.save();
    res.status(201).json({ message: 'Mangá adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar mangá.', error });
  }
};

// Buscar mangás do usuário
const getMangas = async (req, res) => {
  try {
    const { userId, listType } = req.query;

    const mangas = await Manga.find({ userId, listType });
    res.status(200).json(mangas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mangás.', error });
  }
};

// Adicionar volume a um mangá
const addVolume = async (req, res) => {
  try {
    const { mangaId, volume } = req.body;

    const manga = await Manga.findById(mangaId);

    if (!manga) {
      return res.status(404).json({ message: 'Mangá não encontrado.' });
    }

    manga.vols.push(volume);
    await manga.save();

    res.status(200).json({ message: 'Volume adicionado com sucesso!', manga });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar volume.', error });
  }
};

module.exports = { addManga, getMangas, addVolume };
