const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); 

const app = express();

// 🔹 Lista de domínios permitidos
const allowedOrigins = [
  'http://localhost:3000',
  'https://catalogo-manga.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permitir envio de cookies/autenticação
}));

// 🔹 Middleware para JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Carregar Rotas
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
