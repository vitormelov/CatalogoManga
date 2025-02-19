require('dotenv').config(); // 🔹 Carregar variáveis de ambiente primeiro
const mongoose = require('mongoose'); // 🔹 Importar o Mongoose
const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    console.log("🔄 Testando conexão com MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout de 10 segundos
    });
    console.log("✅ Conexão com MongoDB bem-sucedida!");

    // 🔹 Iniciar o servidor só depois que conectar no banco
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erro ao conectar com MongoDB:", error.message);
    process.exit(1); // 🔹 Para evitar que o servidor inicie sem o banco de dados
  }
};

// 🔹 Iniciar a aplicação
startServer();
