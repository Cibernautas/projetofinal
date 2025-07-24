document.addEventListener('DOMContentLoaded', function() {
    const denunciaBtn = document.getElementById('denunciaBtn');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closeBtn');
    
    if(denunciaBtn && popup && closeBtn) {
        denunciaBtn.addEventListener('click', function() {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeBtn.addEventListener('click', function() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        popup.addEventListener('click', function(e) {
            if(e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.error('Um ou mais elementos não foram encontrados no DOM');
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const servicesContainer = document.querySelector('.services-container');

    const cidadaoContent = servicesContainer.innerHTML;

    const empresaContent = `
         <div class="page-container">
        <!-- Layout de duas colunas -->
        <div class="main-content">
            <!-- Coluna Esquerda - Bloco do Secretário -->
            <div class="left-column">
                <div class="secretary-card">
                    <div class="secretary-header">
                        <img src="https://via.placeholder.com/120" alt="Foto do Secretário" class="secretary-photo">
                        <div class="secretary-info">
                            <span class="secretary-title">Secretário</span>
                            <h2 class="secretary-name">Paulo Cézar Monteiro da Silva</h2>
                        </div>
                    </div>
                   
                    <div class="contact-section">
                        <h3 class="contact-title"><i class="fas fa-comments"></i> Fale conosco</h3>
                        <div class="divider"></div>
                        <ul class="contact-list">
                            <li>
                                <i class="fas fa-phone contact-icon"></i>
                                <span>Telefone: 63 3212-7416</span>
                            </li>
                            <li>
                                <i class="fas fa-map-marker-alt contact-icon"></i>
                                <span>Endereço: ASR-SE 115, Av. LO-27, esquina com NS-10. CEP: 77.153-010</span>
                            </li>
                            <li>
                                <i class="fas fa-envelope contact-icon"></i>
                                <span>E-mail: gabinete.seisp@palmas.to.gov.br</span>
                            </li>
                            <li>
                                <i class="fas fa-clock contact-icon"></i>
                                <span>Horário: Segunda a sexta, das 13 às 19 horas</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
           
            <!-- Coluna Direita - Blocos de Conteúdo -->
            <div class="right-column">
                <!-- Bloco Documentos -->
                <div class="documents-card">
                    <i class="fas fa-folder-open documents-icon"></i>
                    <h2 class="documents-title">Documentos e Informações</h2>
                    <div class="documents-content">
                        <p>Documentos oficiais, editais e informações relevantes da secretaria.</p>
                    </div>
                </div>
               
                <!-- Bloco Competências -->
                <div class="competences-card">
                    <h2 class="competences-title">Competências</h2>
                    <div class="scrollable-content">
                        <ol class="competences-list">
                            <p>oirje8teei9tgr087tyhgrs7ugh0w98r7t</p>
                        </ol>
                        <p>A Secretaria Municipal de Infraestrutura e Obras Públicas tem como missão garantir a qualidade da infraestrutura urbana, promovendo o desenvolvimento ordenado da cidade e o bem-estar da população.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            servicesContainer.classList.add('slide-out');

            setTimeout(() => {
                servicesContainer.innerHTML = tab.textContent.trim() === 'Cidadão'
                    ? cidadaoContent
                    : empresaContent;

                servicesContainer.classList.remove('slide-out');
                servicesContainer.classList.add('slide-in');

                setTimeout(() => servicesContainer.classList.remove('slide-in'), 300);
            }, 300);
        });
    });
});
