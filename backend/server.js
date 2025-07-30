require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); // Importa a configuração do passport

// Não precisamos mais desta linha se todas as rotas '/auth' estiverem aqui.
// const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuração do CORS para permitir comunicação com o frontend
app.use(cors({
  origin: 'http://localhost:3000', // URL do seu frontend
  credentials: true // Importante para que cookies (sessões) sejam enviados
}));

app.use(express.json()); // Para parsing de JSON no corpo das requisições

// Configuração da sessão
app.use(session({
  secret: process.env.SESSION_SECRET, // Chave secreta da sessão do .env
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias em milissegundos
    secure: process.env.NODE_ENV === 'production' // Use true em produção (HTTPS)
  }
}));

// Inicializa o Passport e o usa para sessões
app.use(passport.initialize());
app.use(passport.session());

// --- ROTAS DE AUTENTICAÇÃO GOOGLE E SESSÃO ---

// Rota para iniciar o login com Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Rota de callback do Google após a autenticação
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/Segunda Pag/login.html' }), // Redireciona para o login.html em caso de falha
  (req, res) => {
    // Redireciona para a página do seu frontend (index.html na raiz) após login bem-sucedido
    res.redirect('http://localhost:3000/index.html');
  }
);

// Rota para verificar o usuário atual logado (usado pelo frontend no script.js da Segunda Pag)
app.get('/auth/current_user', (req, res) => {
  if (req.user) {
    res.send(req.user); // Se houver um usuário na sessão (logado), envia os dados dele
  } else {
    res.status(401).send({}); // Se não houver usuário, envia status 401 (Não Autorizado) com objeto vazio
  }
});

// Rota para logout
app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => { // req.logout requer um callback a partir do Express 4.x
    if (err) { return next(err); }
    req.session.destroy(() => { // Destrói a sessão após o logout
      res.redirect('http://localhost:3000/Segunda Pag/Principal.html'); // Redireciona para a página principal após logout
    });
  });
});
// --- FIM DAS ROTAS DE AUTENTICAÇÃO ---


// Rota de teste para o backend (apenas para verificar se o servidor está rodando)
app.get('/', (req, res) => {
  res.send('Backend rodando e pronto para autenticação Google!');
});

// Define a porta do servidor (padrão 5000)
const PORT = process.env.PORT || 5000;

// Conecta ao MongoDB e inicia o servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });