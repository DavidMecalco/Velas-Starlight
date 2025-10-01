// Script simple para mostrar SOLO el texto del tipo
(function() {
    'use strict';
    
    function showOnlyTypeText() {
        console.log('🧹 Mostrando SOLO texto de tipos...');
        
        // Buscar todas las opciones de tipo
        const typeCards = document.querySelectorAll('#type-options .option-card, #type-options div[class*="option"]');
        
        typeCards.forEach((card, index) => {
            const fullText = card.textContent || card.innerText || '';
            
            if (fullText && fullText.trim() !== '') {
                let cleanType = '';
                
                // Detectar el tipo y extraer SOLO el nombre
                const lowerText = fullText.toLowerCase();
                
                if (lowerText.includes('soya')) {
                    cleanType = 'Soya';
                } else if (lowerText.includes('parafina')) {
                    cleanType = 'Parafina';
                } else if (lowerText.includes('origen') && lowerText.includes('natural')) {
                    cleanType = 'Origen Natural';
                } else if (lowerText.includes('cera de abeja')) {
                    cleanType = 'Cera de Abeja';
                } else {
                    // Tomar solo la primera palabra limpia
                    const words = fullText.trim().split(/\s+/);
                    cleanType = words[0];
                }
                
                // SOLO TEXTO - Sin iconos, sin descripciones
                card.innerHTML = `
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        min-height: 80px;
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: #2D3E33;
                        text-align: center;
                        padding: 1rem;
                    ">
                        ${cleanType}
                    </div>
                `;
                
                console.log(`✅ Limpiado: "${fullText}" → "${cleanType}"`);
            }
        });
        
        console.log(`🎯 Procesadas ${typeCards.length} tarjetas de tipo`);
    }
    
    // Ejecutar inmediatamente y múltiples veces
    showOnlyTypeText();
    setTimeout(showOnlyTypeText, 100);
    setTimeout(showOnlyTypeText, 300);
    setTimeout(showOnlyTypeText, 600);
    setTimeout(showOnlyTypeText, 1000);
    setTimeout(showOnlyTypeText, 2000);
    
    // Observer para cambios
    const observer = new MutationObserver(function(mutations) {
        let shouldClean = false;
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldClean = true;
            }
        });
        if (shouldClean) {
            setTimeout(showOnlyTypeText, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('🚀 Script de SOLO texto activado');
})();