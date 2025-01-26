const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collections: [
    {
      mangaId: String,
      title: String,
      volumes: [
        {
          number: Number,
          price: Number,
        },
      ],
    },
  ],
  wishlist: [
    {
      mangaId: String,
      title: String,
      image: String,
    },
  ],
});

// Hash de senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
