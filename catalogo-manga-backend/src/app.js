const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const mangaRoutes = require('./routes/mangaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔹 Permitir apenas requisições do Vercel
const allowedOrigins = ['https://catalogo-manga.vercel.app'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // 🔹 Responder imediatamente a requisições OPTIONS (preflight request)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// 🔹 Middleware CORS (deve estar antes das rotas)
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Rotas
app.use('/api/mangas', mangaRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
