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

    // Verificar se o e-mail ou nome de usuário já estão cadastrados
    console.log('🔍 Verificando se o usuário já existe...');
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      console.error('❌ Erro: Usuário já existe!');
      return res.status(400).json({ message: 'Usuário ou e-mail já cadastrados!' });
    }

    // Hash da senha antes de salvar
    console.log('🔒 Criando hash da senha...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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

// Login do usuário
const loginUser = async (req, res) => {
  try {
    console.log('📩 Recebendo requisição para login...');
    
    const { username, password } = req.body;

    if (!username || !password) {
      console.error('❌ Erro: Campos obrigatórios faltando!');
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios!' });
    }

    // Verificar se o usuário existe
    console.log(`🔍 Buscando usuário: ${username}`);
    const user = await User.findOne({ username });

    if (!user) {
      console.error('❌ Erro: Usuário não encontrado!');
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar a senha
    console.log('🔑 Verificando senha...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('❌ Erro: Senha incorreta!');
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Gerar um token JWT
    console.log('🔐 Gerando token JWT...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log('✅ Login realizado com sucesso!');
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user._id, username: user.username },
    });

  } catch (error) {
    console.error('❌ Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
  }
};

module.exports = { createUser, loginUser };
