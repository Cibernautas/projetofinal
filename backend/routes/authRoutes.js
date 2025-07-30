const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirecione para a página do seu frontend após o login bem-sucedido
    // Você pode criar um arquivo frontend/index.html ou apontar para a rota do seu app React/Vue/Angular
    res.redirect('http://localhost:3000/success.html'); // Exemplo: redireciona para um arquivo HTML simples
  }
);

// Rota para verificar se o usuário está logado (opcional)
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

// Rota para logout (opcional)
router.get('/logout', (req, res) => {
  req.logout((err) => { // Use callback para req.logout
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;