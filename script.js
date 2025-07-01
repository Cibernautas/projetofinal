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

