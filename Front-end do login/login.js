// Front-end/login.js
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem);
      window.location.href = '../index.html';
    } else {
      alert(data.mensagem);
    }
  } catch (error) {
    alert('Erro ao fazer login: ' + error.message);
  }
});
