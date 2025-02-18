const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

console.log('✅ Backend iniciado!');

const allowedOrigins = ['https://catalogo-manga.vercel.app'];

//  Middleware Express (bodyParser deve vir ANTES do cors e do seu CORS personalizado)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Tratamento de CORS personalizado (DEVE vir ANTES do cors())
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

//  Middleware cors() (Agora ele respeitará suas configurações personalizadas)
app.use(cors()); // Você pode até não precisar mais deste

console.log(' Carregando rotas...');
app.use('/api/users', userRoutes);
console.log('✅ Rotas carregadas!');

app.get('/', (req, res) => {
  res.send('✅ API do Catálogo de Mangás está funcionando!');
});

app.use((err, req, res, next) => {
  console.error('❌ Erro global:', err);
  res.status(500).json({ message: 'Erro interno do servidor.', error: err.message });
});

module.exports = app;