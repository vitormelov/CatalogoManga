const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = require('./src/app');

// Carregar variáveis de ambiente
dotenv.config();

// Configuração do CORS para permitir o frontend no Vercel
app.use(cors({
  origin: 'https://catalogo-manga.vercel.app', // Permite apenas o frontend no Vercel
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
