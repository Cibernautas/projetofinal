document.addEventListener('DOMContentLoaded', function() {
    function openPopup(popupElement) {
        popupElement.style.display = 'flex';
        document.body.classList.add('popup-open');
    }

    function closePopup(popupElement) {
        popupElement.style.display = 'none';
        document.body.classList.remove('popup-open');
    }

    // Event listeners para popups de denúncia
    const denunciaBtn = document.getElementById('denunciaBtn');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closeBtn');

    if(denunciaBtn) denunciaBtn.addEventListener('click', () => openPopup(popup));
    if(closeBtn) closeBtn.addEventListener('click', () => closePopup(popup));
    
    if(popup) popup.addEventListener('click', function(e) {
        if(e.target === popup) closePopup(popup);
    });

    // Event listeners para popups do manual
    const manualBtn = document.getElementById('manualBtn');
    const manualPopup = document.getElementById('manualPopup');
    const closeManualBtn = document.getElementById('closeManualBtn');

    if(manualBtn) manualBtn.addEventListener('click', () => openPopup(manualPopup));
    if(closeManualBtn) closeManualBtn.addEventListener('click', () => closePopup(manualPopup));
    
    if(manualPopup) manualPopup.addEventListener('click', function(e) {
        if(e.target === manualPopup) closePopup(manualPopup);
    });

    const tabs = document.querySelectorAll('.tab');
    const servicesContainer = document.querySelector('.services-container');
    const cidadaoContent = servicesContainer.innerHTML;

    const empresaContent = `
        <div class="page-container">
            <div class="main-content">
                <div class="left-column">
                    <div class="empresa-card">
                        <div class="empresa-header">
                            <img src="/projetofinal/Img/LogoPreta.png" alt="Logo" class="empresa-logo">
                            <div class="empresa-info">
                                <span class="empresa-title">Uxers Tech</span>
                                <h2 class="empresa-name">Empresa de técnologia</h2>
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
                                    <span>E-mail: techuxers@gmail.com</span>
                                </li>
                                <li>
                                    <i class="fas fa-clock contact-icon"></i>
                                    <span>Horário: Segunda a sexta, das 08 às 19 horas</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
               
                <div class="right-column">
                    <!-- Bloco Documentos -->
                    <div class="documents-card">
                        <i class="fas fa-folder-open documents-icon"></i>
                        <h2 class="documents-title">Informações</h2>
                        <div class="documents-content">
                            <p>Fundada em 28 de janeiro de 2024 em Palmas-TO, a Uxers Tech nasceu da visão de três técnicos, identificando a necessidade urgente de modernizar a gestão urbana através da tecnologia.
                            Nosso primeiro produto, o SIGOP Palmas, é lançado em junho de 2025 como projeto-piloto em parceria com a Prefeitura Municipal, visando alcançar impressionantes 3.500 usuários registrados nos primeiros 3 meses.</p>
                        </div>
                    </div>
                   
                    <div class="competences-card">
                        <div class="scrollable-content">
                            <ol class="competences-list">
                                <p>A Uxers Tech é uma empresa de inovação digital comprometida com o desenvolvimento de soluções tecnológicas que promovem
                                cidades mais inteligentes e participativas. Especializada em plataformas cívicas, nossa empresa criou o SIGOP Palmas (Sistema
                                Integrado de Gestão de Ocorrências de Infraestrutura Pública), uma ferramenta que revoluciona a forma como os cidadãos interagem
                                com os serviços urbanos. Nosso foco principal é oferecer uma plataforma integrada de gestão de ocorrências, permitindo que os
                                moradores de Palmas reportem problemas de infraestrutura de forma rápida e eficiente, como buracos em vias, falhas na iluminação
                                pública ou questões ambientais. Através de um design intuitivo e acessível, garantimos que qualquer cidadão possa contribuir para
                                a melhoria da cidade, independentemente de seu conhecimento tecnológico. Além de facilitar o registro de ocorrências, o SIGOP Palmas
                                foi desenvolvido para gerar dados estratégicos, ajudando a prefeitura a identificar padrões, priorizar intervenções e otimizar recursos
                                públicos. A transparência é um dos nossos pilares: todos os usuários podem acompanhar o status de suas solicitações, criando um ciclo de
                                confiança entre governo e população. Na Uxers Tech, acreditamos que a tecnologia deve servir como ponte entre as necessidades dos cidadãos
                                e a capacidade de resposta do poder público. Combinamos design centrado no usuário, análise de dados e integração com órgãos municipais para criar soluções que não apenas resolvem problemas, mas também fortalecem a participação social.</p>
                            </ol>
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
                
                const newDenunciaBtn = document.getElementById('denunciaBtn');
                const newManualBtn = document.getElementById('manualBtn');
                
                if(newDenunciaBtn) newDenunciaBtn.addEventListener('click', () => openPopup(popup));
                if(newManualBtn) newManualBtn.addEventListener('click', () => openPopup(manualPopup));
                
                setupSearchFunctionality();
            }, 300);
        });
    });

    function setupSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');

        if (!searchInput || !searchButton) return;

        const searchableContents = [
            {
                title: "Como Fazer uma Denúncia",
                content: document.querySelector('#popup .tutorial-content')?.innerText || '',
                openFunction: () => openPopup(popup)
            },
            {
                title: "Manual do Usuário",
                content: document.querySelector('#manualPopup .tutorial-content')?.innerText || '',
                openFunction: () => openPopup(manualPopup)
            }
        ];

        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (!searchTerm) {
                alert("Por favor, digite algo para pesquisar");
                return;
            }

            const results = searchableContents.filter(item => 
                item.title.toLowerCase().includes(searchTerm) || 
                item.content.toLowerCase().includes(searchTerm)
            );

            if (results.length === 0) {
                alert("Nenhum resultado encontrado");
                return;
            }

            if (results.length === 1) {
                results[0].openFunction();
            } else {
                const resultText = results.map((r, i) => 
                    `${i+1}. ${r.title}`).join('\n');
                const choice = prompt(`Foram encontrados vários resultados:\n${resultText}\nDigite o número do que deseja ver:`);
                
                if (choice && results[Number(choice)-1]) {
                    results[Number(choice)-1].openFunction();
                }
            }
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    setupSearchFunctionality();
});