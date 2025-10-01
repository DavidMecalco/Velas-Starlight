// Script agresivo para limpiar texto de opciones de tipo
(function() {
    'use strict';
    
    function forceCleanTypeText() {
        console.log('🧹 FORZANDO limpieza de texto de tipos...');
        
        // Buscar todas las opciones de tipo
        const typeCards = document.querySelectorAll('#type-options .option-card, #type-options div, [id*="type"] .option-card');
        
        typeCards.forEach((card, index) => {
            const fullText = card.textContent || card.innerText || '';
            console.log(`Tarjeta ${index}: "${fullText}"`);
            
            if (fullText && fullText.trim() !== '') {
                let cleanType = '';
                let icon = '';
                let description = '';
                
                // Detectar el tipo basado en el contenido
                const lowerText = fullText.toLowerCase();
                
                if (lowerText.includes('soya')) {
                    cleanType = 'Soya';
                    icon = '<i class="fas fa-leaf"></i>';
                    description = 'Cera de soya';
                } else if (lowerText.includes('parafina')) {
                    cleanType = 'Parafina';
                    icon = '<i class="fas fa-fire"></i>';
                    description = 'Cera de parafina';
                } else if (lowerText.includes('origen') || lowerText.includes('natural')) {
                    cleanType = 'Origen Natural';
                    icon = '<i class="fas fa-seedling"></i>';
                    description = 'Ingredientes naturales';
                } else {
                    // Tomar solo la primera palabra
                    const words = fullText.trim().split(/\s+/);
                    cleanType = words[0];
                    icon = '<i class="fas fa-cube"></i>';
                    description = 'Material premium';
                }
                
                // FORZAR el contenido limpio
                card.innerHTML = `
                    <div class="type-icon" style="width: 48px; height: 48px; background: rgba(163, 177, 138, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; color: #3A5A40; margin-bottom: 0.75rem;">
                        ${icon}
                    </div>
                    <div class="type-name" style="font-size: 1rem; font-weight: 700; color: #2D3E33; margin-bottom: 0.25rem;">
                        ${cleanType}
                    </div>
                    <div class="type-description" style="font-size: 0.75rem; color: #6B7280; line-height: 1.3;">
                        ${description}
                    </div>
                `;
                
                console.log(`✅ Limpiado: "${fullText}" → "${cleanType}"`);
            }
        });
        
        console.log(`🎯 Procesadas ${typeCards.length} tarjetas de tipo`);
    }
    
    // Ejecutar inmediatamente
    forceCleanTypeText();
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceCleanTypeText);
    }
    
    // Ejecutar múltiples veces con intervalos
    setTimeout(forceCleanTypeText, 100);
    setTimeout(forceCleanTypeText, 300);
    setTimeout(forceCleanTypeText, 600);
    setTimeout(forceCleanTypeText, 1000);
    setTimeout(forceCleanTypeText, 2000);
    setTimeout(forceCleanTypeText, 3000);
    
    // Observer muy agresivo
    const observer = new MutationObserver(function(mutations) {
        let shouldClean = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.matches && (node.matches('#type-options *') || node.querySelector('#type-options *'))) {
                            shouldClean = true;
                        }
                    }
                });
            }
        });
        
        if (shouldClean) {
            setTimeout(forceCleanTypeText, 50);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
    
    // Ejecutar cada vez que se hace clic en cualquier parte
    document.addEventListener('click', function() {
        setTimeout(forceCleanTypeText, 100);
    });
    
    console.log('🚀 Script de limpieza de tipos activado');
})();