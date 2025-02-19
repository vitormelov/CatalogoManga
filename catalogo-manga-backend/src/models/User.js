const createUser = async (req, res) => {
  try {
    console.log('📩 Recebendo requisição para criar usuário...');

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.error('❌ Erro: Campos obrigatórios faltando!');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    console.log('🔍 Verificando se o usuário já existe...');
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      console.error('❌ Erro: Usuário já existe!');
      return res.status(400).json({ message: 'Usuário ou e-mail já cadastrados!' });
    }

    console.log('✅ Criando usuário no banco de dados...');
    const user = new User({ username, email, password }); // 🔹 Não faz hash aqui
    await user.save();

    console.log('🎉 Usuário criado com sucesso!');
    res.status(201).json({ message: 'Conta criada com sucesso!' });

  } catch (error) {
    console.error('❌ Erro ao criar a conta:', error);
    res.status(500).json({ message: 'Erro ao criar a conta.', error: error.message });
  }
};
