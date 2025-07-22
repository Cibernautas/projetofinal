document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checklist-form');
    const midiaInput = document.getElementById('midia');
    const canvas = document.getElementById('signature-pad');
    const signaturePad = new SignaturePad(canvas);
    const clearButton = document.getElementById('clear-signature');
    const video = document.getElementById('camera');
    const captureBtn = document.getElementById('capture');
    const previewsContainer = document.getElementById('previews');

    let fotosCapturadas = [];

    // Inicializa a câmera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
                video.style.visibility = 'visible';
                video.style.height = 'auto';
            };
        })
        .catch(err => {
            console.error("Erro ao acessar câmera: ", err);
            alert("Erro: não foi possível acessar a câmera. Verifique as permissões e se está usando HTTPS.");
        });

    // Captura imagem da câmera
    captureBtn.addEventListener('click', () => {
        if (!video.videoWidth || !video.videoHeight) {
            alert("A câmera ainda está carregando. Tente novamente.");
            return;
        }

        const canvasFoto = document.createElement('canvas');
        canvasFoto.width = video.videoWidth;
        canvasFoto.height = video.videoHeight;
        canvasFoto.getContext('2d').drawImage(video, 0, 0);

        canvasFoto.toBlob(blob => {
            if (!blob) {
                alert("Erro ao capturar a imagem da câmera.");
                return;
            }

            fotosCapturadas.push(blob);

            const img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            img.style.maxWidth = "100px";
            img.style.border = "1px solid #ccc";
            img.style.borderRadius = "6px";
            previewsContainer.appendChild(img);
        }, 'image/jpeg');
    });

    // Limpa a assinatura
    clearButton.addEventListener('click', () => {
        signaturePad.clear();
    });

    // Redimensiona canvas da assinatura para responsividade
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        signaturePad.clear();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
    }



    // Envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = document.getElementById('submit-btn'); // <-- MOVIDO PARA CIMA

        const documento = form.querySelector('input[name="Documento"]').value.trim();
        if (documento && !validarCPF(documento)) {
            alert("CPF inválido. Por favor, verifique o número inserido.");
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        if (signaturePad.isEmpty()) {
            alert("Por favor, forneça sua assinatura digital.");
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
            return;
        }

        const formData = new FormData(form);
        formData.set('AssinaturaBase64', signaturePad.toDataURL('image/png'));

        // Fotos da câmera → Base64
        const fotosBase64 = await Promise.all(fotosCapturadas.map(blob => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        }));
        fotosBase64.forEach((base64, i) => {
            formData.append(`MidiaBase64_${i}`, base64);
        });

        // Fotos/Vídeos da galeria → Base64
        const galeriaFiles = Array.from(midiaInput.files);
        for (let i = 0; i < galeriaFiles.length; i++) {
            const file = galeriaFiles[i];
            if (!file.type.startsWith("image/")) continue; // ignora vídeos

            const base64 = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
            formData.append(`MidiaBase64_${fotosBase64.length + i}`, base64);
        }


        // Envia para Google Apps Script
        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbxReNcQbBcD6aYeRUGGJqylqAaFvIue4o_0wlL8pvyDMkI2dbuPk2BK98zm7SxRw7z-3A/exec", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.status === "success" && result.pdf) {
                sessionStorage.setItem("pdfUrl", result.pdf);
                sessionStorage.setItem("denunciaId", result.id || "Desconhecido"); // <-- NOVO
                form.reset();
                signaturePad.clear();
                previewsContainer.innerHTML = "";
                fotosCapturadas = [];
                window.location.href = "../ligação_bd/sucesso.html";
            } else {
                alert("Erro ao gerar PDF: " + (result.message || "Erro desconhecido"));
            }
        } catch (err) {
            console.error("Erro ao enviar:", err);
            alert("Erro ao enviar o formulário: " + err.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
        }
    });
});
document.getElementById("ver-termos").addEventListener("click", function () {
  const termosBox = document.getElementById("termos-box");
  termosBox.style.display = termosBox.style.display === "none" ? "block" : "none";
});