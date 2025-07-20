// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
})
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
