// Front-end/cadastro.js
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const last_name = document.getElementById('last_name').value;
  const birthdate = document.getElementById('birthdate').value;

  if (!gender) {
    alert('Por favor, selecione o gênero.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha, gender, last_name, birthdate })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem);
      window.location.href = 'login.html';
    } else {
      alert(data.mensagem);
    }
  } catch (error) {
    alert('Erro ao cadastrar: ' + error.message);
  }
});
