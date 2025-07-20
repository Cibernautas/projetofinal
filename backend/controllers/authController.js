// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Cadastro de novo usuário
const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se já existe um usuário com esse email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria e salva o novo usuário
    const newUser = new User({ nome, email, senha: hashedPassword });
    await newUser.save();

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar', erro: err.message });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verifica se a senha bate
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no login', erro: err.message });
  }
};

module.exports = { register, login };
