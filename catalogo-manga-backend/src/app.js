const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔹 Lista de domínios permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'https://catalogo-manga.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Responde imediatamente para preflight requests
  }

  next();
});

// 🔹 Middleware CORS (agora sempre antes das rotas)
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔹 Middlewares do Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Rotas
app.use('/api/users', userRoutes);

// 🔹 Rota de teste para verificar se a API está rodando corretamente
app.get('/', (req, res) => {
  res.send('✅ API do Catálogo de Mangás está funcionando!');
});

// 🔹 Middleware para capturar erros globais
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ message: 'Erro interno do servidor.', error: err.message });
});

module.exports = app;
