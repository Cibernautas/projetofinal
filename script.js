function redirecionar(tipo) {
  switch (tipo) {
    case 'infraestrutura':
      window.location.href = "infraestrutura/infra.html";
      break;
    case 'iluminacao':
      window.location.href = 'iluminação/ilumi.html';
      break;
    case 'meioambiente':
      window.location.href = 'mato/mato.html';
      break;
    default:
      alert('Tipo de formulário inválido');
  }
}

// <-- ADICIONE AQUI A FUNÇÃO DE CONSULTA:

async function consultarDenuncia() {
  const id = document.getElementById("idDenuncia").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "🔍 Buscando...";

  if (!id) {
    resultado.innerHTML = "⚠️ Por favor, insira um ID válido.";
    return;
  }

  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbz5MKnTKTuhrZqN4v-IgS83C9rB2VUC1vdTHPCYoa4RAfI2zfAc8HvVnlMI0tUMgviLSg/exec?id=${id}`);
    const data = await res.json();

    if (data.status === "success") {
      resultado.innerHTML = `
        <p><strong>Nome:</strong> ${data.Nome}</p>
        <p><strong>Localização:</strong> ${data.Localizacao}</p>
        <p><strong>Tipo de Problema:</strong> ${data.TipoProblema}</p>
        <p><strong>Descrição:</strong> ${data.DescricaoProblema}</p>
        <p><strong>Link do PDF:</strong> <a href="${data.pdf}" target="_blank">Abrir PDF</a></p>
      `;
    } else {
      resultado.innerHTML = "❌ Denúncia não encontrada.";
    }
  } catch (err) {
    resultado.innerHTML = "❌ Erro ao consultar: " + err.message;
  }

}
