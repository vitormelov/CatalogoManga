const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  mal_id: { type: Number, required: true, unique: true },
  images: { type: Object, required: true },
  rank: { type: Number },
  popularity: { type: Number },
  published: { type: Object },
  volumes: { type: Number },
  chapters: { type: Number },
  listType: { type: String, enum: ['collection', 'wishlist'], required: true },
  vols: [
    {
      volume: String,
      name: String,
      date: String,
      price: Number,
      status: String,
    },
  ],
});

module.exports = mongoose.model('Manga', mangaSchema);
