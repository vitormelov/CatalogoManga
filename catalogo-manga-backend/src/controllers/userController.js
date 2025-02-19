const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Criar um novo usuário
const createUser = async (req, res) => {
  try {
    console.log('📩 Recebendo requisição para criar usuário...');

    const { username, email, password } = req.body;

    // Validação: verificar se todos os campos estão preenchidos
    if (!username || !email || !password) {
      console.error('❌ Erro: Campos obrigatórios faltando!');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    // Verificar se o usuário já existe
    console.log('🔍 Verificando se o usuário já existe...');
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      console.error('❌ Erro: Usuário já existe!');
      return res.status(400).json({ message: 'Usuário ou e-mail já cadastrados!' });
    }

    // Criar hash da senha antes de salvar
    console.log('🔒 Criando hash da senha...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar novo usuário
    console.log('✅ Criando usuário no banco de dados...');
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    console.log('🎉 Usuário criado com sucesso!');
    res.status(201).json({ message: 'Conta criada com sucesso!' });

  } catch (error) {
    console.error('❌ Erro ao criar a conta:', error);
    res.status(500).json({ message: 'Erro ao criar a conta.', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log("📩 Requisição recebida em /login");

    const { username, password } = req.body;

    if (!username || !password) {
      console.log("❌ Erro: Campos obrigatórios faltando!");
      return res.status(400).json({ message: "Usuário e senha são obrigatórios!" });
    }

    console.log(`🔍 Buscando usuário: ${username}`);

    // Buscar usuário no banco
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      console.log("❌ Usuário não encontrado!");
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    console.log("🔑 Verificando senha...");
    console.log(`🔍 Senha enviada: ${password}`);
    console.log(`🔍 Senha salva no banco: ${user.password}`);

    // Comparar senha fornecida com a salva no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("❌ Senha incorreta!");
      return res.status(400).json({ message: "Senha incorreta!" });
    }

    console.log("✅ Senha correta!");

    // Gerar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log("✅ Login realizado com sucesso!");
    res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });

  } catch (error) {
    console.error("❌ Erro ao realizar login:", error);
    res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
  }
};

module.exports = { createUser, loginUser };
