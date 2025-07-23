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