function redirecionar(tipo) {
  switch (tipo) {
    case 'infraestrutura':
      window.location.href = "/infraestrutura/index.html";
      break;
    case 'iluminacao':
      window.location.href = 'iluminacao.html';
      break;
    case 'meioambiente':
      window.location.href = 'meioambiente.html';
      break;
    default:
      alert('Tipo de formulário inválido');
  }
}
