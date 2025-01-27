const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar duplicidade de e-mail ou nome de usuário
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário ou e-mail já cadastrados!' });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'Conta criada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a conta.', error });
  }
};

// Login do usuário
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login.', error });
  }
};

module.exports = { createUser, loginUser };
