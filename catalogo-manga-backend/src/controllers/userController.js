const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🟢 Criar um novo usuário
const createUser = async (req, res) => {
  try {
    console.log('📩 Recebendo requisição para criar usuário...');
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário ou e-mail já cadastrados!' });
    }

    console.log('🔒 Criando hash da senha...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, mangas: [] });
    await user.save();

    res.status(201).json({ message: 'Conta criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a conta.', error: error.message });
  }
};

// 🟢 Login do usuário
const loginUser = async (req, res) => {
  try {
    console.log("📩 Requisição recebida em /login");
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Usuário e senha são obrigatórios!" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      user: { id: user._id, username: user.username, email: user.email, mangas: user.mangas },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
  }
};

// 🟢 Buscar mangás por tipo (wishlist ou collection)
const getMangas = async (req, res) => {
  try {
    const { userId, listType } = req.params;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const mangas = user.mangas.filter(manga => manga.listType === listType);
    res.status(200).json(mangas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar mangás.", error: error.message });
  }
};

// 🟢 Adicionar um mangá ao usuário
const addManga = async (req, res) => {
  try {
    const { userId, mal_id, title, images, rank, popularity, published, volumes, chapters, listType } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

    const existingManga = user.mangas.find((m) => m.mal_id === mal_id && m.listType === listType);
    if (existingManga) return res.status(400).json({ message: "Mangá já está nesta lista!" });

    user.mangas.push({ mal_id, title, images, rank, popularity, published, volumes, chapters, listType, vols: [] });

    await user.save();
    res.status(201).json({ message: "Mangá adicionado com sucesso!", mangas: user.mangas });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar mangá.", error: error.message });
  }
};

// 🟢 Deletar um mangá do usuário
const deleteManga = async (req, res) => {
  try {
    const { userId, mal_id } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

    user.mangas = user.mangas.filter((m) => m.mal_id !== mal_id);
    await user.save();

    res.status(200).json({ message: "Mangá deletado com sucesso!", mangas: user.mangas });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar mangá.", error: error.message });
  }
};

// 🟢 Adicionar um volume a um mangá do usuário
const addVolume = async (req, res) => {
  try {
    const { userId, mal_id, volume } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

    const manga = user.mangas.find((m) => m.mal_id === mal_id);
    if (!manga) return res.status(404).json({ message: "Mangá não encontrado!" });

    manga.vols.push(volume);
    await user.save();

    res.status(200).json({ message: "Volume adicionado com sucesso!", mangas: user.mangas });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar volume.", error: error.message });
  }
};

// 🟢 Deletar um volume de um mangá do usuário
const deleteVolume = async (req, res) => {
  try {
    const { userId, mal_id, volumeIndex } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

    const manga = user.mangas.find((m) => m.mal_id === mal_id);
    if (!manga) return res.status(404).json({ message: "Mangá não encontrado!" });

    manga.vols.splice(volumeIndex, 1);
    await user.save();

    res.status(200).json({ message: "Volume deletado com sucesso!", mangas: user.mangas });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar volume.", error: error.message });
  }
};

// 🟢 Mover um mangá da wishlist para a coleção
const moveMangaToCollection = async (req, res) => {
  try {
    const { userId, mal_id } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

    const manga = user.mangas.find((m) => m.mal_id === mal_id);
    if (!manga) return res.status(404).json({ message: "Mangá não encontrado na wishlist!" });

    manga.listType = "collection";
    await user.save();

    res.status(200).json({ message: "Mangá movido para a coleção!", mangas: user.mangas });
  } catch (error) {
    res.status(500).json({ message: "Erro ao mover mangá.", error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getMangas,
  addManga,
  deleteManga,
  addVolume,
  deleteVolume,
  moveMangaToCollection
};
