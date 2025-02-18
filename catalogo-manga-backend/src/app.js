const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔹 Lista de domínios permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'https://catalogo-manga.vercel.app',
  'https://catalogomanga.onrender.com'
];

// 🔹 Middleware CORS - Permite requisições do Frontend (Vercel)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // Responde imediatamente as preflight requests
  }

  next();
});

// 🔹 Middleware Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Mantém o CORS ativo para qualquer outra requisição

// 🔹 Rotas
app.use('/api/users', userRoutes);

// 🔹 Rota de Teste
app.get('/', (req, res) => {
  res.send('✅ API do Catálogo de Mangás está funcionando!');
});

// 🔹 Middleware de Erro Global
app.use((err, req, res, next) => {
  console.error('❌ Erro global:', err);
  res.status(500).json({ message: 'Erro interno do servidor.', error: err.message });
});

module.exports = app;
