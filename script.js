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



/* arrasta pro lado */

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const servicesContainer = document.querySelector('.services-container');

    // Guarda o HTML original de Cidadão
    const cidadaoContent = servicesContainer.innerHTML;

    // HTML de Empresa
    const empresaContent = `
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="service-name">Abrir CNPJ</div>
            </div>
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-file-contract"></i>
                </div>
                <div class="service-name">Licenciamento</div>
            </div>
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-balance-scale"></i>
                </div>
                <div class="service-name">Tributos Empresariais</div>
            </div>
        </div>
    `;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return;

            // marca aba ativa
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // anima slide-out
            servicesContainer.classList.add('slide-out');

            setTimeout(() => {
                // troca o conteúdo
                servicesContainer.innerHTML = tab.textContent.trim() === 'Cidadão'
                    ? cidadaoContent
                    : empresaContent;

                // anima slide-in
                servicesContainer.classList.remove('slide-out');
                servicesContainer.classList.add('slide-in');

                // limpa a classe após animação
                setTimeout(() => servicesContainer.classList.remove('slide-in'), 300);
            }, 300);
        });
    });
});
