const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, required: true, unique: true },
  googleId: String
});

module.exports = mongoose.model('User', userSchema);