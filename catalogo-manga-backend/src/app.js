const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const mangaRoutes = require('./routes/mangaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔹 Configuração do CORS para permitir requisições do frontend no Vercel
app.use(cors({
  origin: 'https://catalogo-manga.vercel.app', // Permite apenas o frontend hospedado no Vercel
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔹 Middleware para garantir que todas as respostas incluam os headers CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://catalogo-manga.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/mangas', mangaRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
