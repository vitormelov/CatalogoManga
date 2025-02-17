require('dotenv').config(); // 🔹 Carregar variáveis de ambiente primeiro
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
