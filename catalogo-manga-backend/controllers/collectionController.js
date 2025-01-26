const User = require('../models/userModel');

// Adicionar à coleção
exports.addToCollection = async (req, res) => {
  const { mangaId, title, volume } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const existingManga = user.collections.find((manga) => manga.mangaId === mangaId);

    if (existingManga) {
      existingManga.volumes.push(volume);
    } else {
      user.collections.push({ mangaId, title, volumes: [volume] });
    }

    await user.save();
    res.status(200).json(user.collections);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar à coleção', error });
  }
};

// Adicionar à lista de desejos
exports.addToWishlist = async (req, res) => {
  const { mangaId, title, image } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user.wishlist.some((manga) => manga.mangaId === mangaId)) {
      user.wishlist.push({ mangaId, title, image });
    }

    await user.save();
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar à lista de desejos', error });
  }
};
