const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

const app = express();

// Configuração do CORS
const allowedOrigins = ['https://catalogo-manga.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware para garantir que o CORS funcione corretamente
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Responde à requisição OPTIONS com status 204
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/users', userRoutes); // Usa as rotas de usuário

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Catálogo de Mangás está funcionando!');
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ message: 'Erro interno do servidor.', error: err.message });
});

module.exports = app; // 🔹 Exporta o app