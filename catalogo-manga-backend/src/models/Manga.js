const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: [String] },
  volumes: [
    {
      number: Number,
      price: Number,
      purchaseDate: Date,
    },
  ],
});

module.exports = mongoose.model('Manga', mangaSchema);
