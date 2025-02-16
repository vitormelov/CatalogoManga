const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const mangaRoutes = require('./routes/mangaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔹 Configuração global do CORS (permitindo o frontend no Vercel)
const allowedOrigins = ['https://catalogo-manga.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔹 Middleware para forçar a inclusão dos headers CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://catalogo-manga.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Se for uma requisição de "preflight" (OPTIONS), respondemos imediatamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/mangas', mangaRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
