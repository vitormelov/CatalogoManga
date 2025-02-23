const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mangaSchema = new mongoose.Schema({
  mal_id: { type: Number, required: true },
  title: { type: String, required: true },
  images: { type: Object, required: true },
  rank: { type: Number },
  popularity: { type: Number },
  published: { type: Object },
  volumes: { type: Number },
  chapters: { type: Number },
  listType: { type: String, enum: ['collection', 'wishlist'], required: true },
  vols: [{ 
    volume: String, 
    name: String, 
    date: String, 
    price: Number, 
    status: String 
  }]
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mangas: [mangaSchema],  // 🔹 Agora os mangás ficam dentro do usuário!
});

module.exports = mongoose.model('User', userSchema);
