const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 🔹 Testar se o backend inicia corretamente
console.log('✅ Backend iniciado!');

// 🔹 Lista de domínios permitidos
const allowedOrigins = ['https://catalogo-manga.vercel.app'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', 'https://catalogo-manga.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// 🔹 Middleware Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 🔹 Teste se as rotas estão carregando corretamente
console.log('🔄 Carregando rotas...');
app.use('/api/users', userRoutes);
console.log('✅ Rotas carregadas!');

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
