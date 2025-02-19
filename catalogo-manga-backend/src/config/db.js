const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ ERRO: MONGO_URI não está definido no .env!');
  process.exit(1);
}

const connectDB = async () => {
  try {
    console.log('🔄 Tentando conectar ao MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout para evitar loops infinitos
    });

    console.log('✅ Conectado ao MongoDB Atlas!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
