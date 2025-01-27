const app = require('./src/app');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
