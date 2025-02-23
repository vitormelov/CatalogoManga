const User = require('../models/User');

// 🔹 Adicionar mangá à coleção ou lista de desejos do usuário
const addManga = async (req, res) => {
  try {
    const { userId, mal_id, title, images, rank, popularity, published, volumes, chapters, listType } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // Verifica se o mangá já está na lista do usuário
    const existingManga = user.mangas.find(manga => manga.mal_id === mal_id && manga.listType === listType);
    if (existingManga) {
      return res.status(400).json({ message: 'Mangá já está nesta lista.' });
    }

    user.mangas.push({ mal_id, title, images, rank, popularity, published, volumes, chapters, listType, vols: [] });
    await user.save();

    res.status(201).json({ message: '📌 Mangá adicionado com sucesso!', userMangas: user.mangas });
  } catch (error) {
    res.status(500).json({ message: '❌ Erro ao adicionar mangá.', error });
  }
};

// 🔹 Buscar os mangás do usuário
const getMangas = async (req, res) => {
  try {
    const { userId, listType } = req.query;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const mangas = user.mangas.filter(manga => manga.listType === listType);
    res.status(200).json(mangas);
  } catch (error) {
    res.status(500).json({ message: '❌ Erro ao buscar mangás.', error });
  }
};

// 🔹 Adicionar volume a um mangá específico do usuário
const addVolume = async (req, res) => {
  try {
    const { userId, mangaId, volume } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const manga = user.mangas.id(mangaId);
    if (!manga) return res.status(404).json({ message: 'Mangá não encontrado.' });

    manga.vols.push(volume);
    await user.save();

    res.status(200).json({ message: '📌 Volume adicionado com sucesso!', manga });
  } catch (error) {
    res.status(500).json({ message: '❌ Erro ao adicionar volume.', error });
  }
};

// 🔹 Deletar um mangá do usuário
const deleteManga = async (req, res) => {
  try {
    const { userId, mangaId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    user.mangas = user.mangas.filter(manga => manga._id.toString() !== mangaId);
    await user.save();

    res.status(200).json({ message: '📌 Mangá deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: '❌ Erro ao deletar mangá.', error });
  }
};

// 🔹 Deletar um volume específico do mangá do usuário
const deleteVolume = async (req, res) => {
  try {
    const { userId, mangaId, volumeIndex } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const manga = user.mangas.id(mangaId);
    if (!manga) return res.status(404).json({ message: 'Mangá não encontrado.' });

    manga.vols.splice(volumeIndex, 1);
    await user.save();

    res.status(200).json({ message: '📌 Volume deletado com sucesso!', manga });
  } catch (error) {
    res.status(500).json({ message: '❌ Erro ao deletar volume.', error });
  }
};

// 🔹 Mover um mangá da wishlist para a coleção
const moveMangaToCollection = async (req, res) => {
  try {
    const { userId, mangaId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const manga = user.mangas.id(mangaId);
    if (!manga) return res.status(404).json({ message: 'Mangá não encontrado.' });

    manga.listType = 'collection';
    await user.save();

    res.status(200).json({ message: '📌 Mangá movido para a coleção!', manga });
  } catch (error) {
    res.status(500).json({ message: '❌ Erro ao mover mangá.', error });
  }
};

module.exports = { addManga, getMangas, addVolume, deleteManga, deleteVolume, moveMangaToCollection };
