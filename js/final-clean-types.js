// Script FINAL y ÚNICO para limpiar tipos - Sin conflictos
(function() {
    'use strict';
    
    let isProcessing = false;
    
    function cleanTypeTextFinal() {
        if (isProcessing) return;
        isProcessing = true;
        
        console.log('🧹 Script FINAL: Limpiando tipos...');
        
        // Buscar TODAS las opciones de tipo posibles
        const selectors = [
            '#type-options .option-card',
            '#type-options div[class*="option"]',
            '#type-options > div',
            '[id*="type"] .option-card',
            '[id*="type"] > div'
        ];
        
        let allCards = [];
        selectors.forEach(selector => {
            const found = document.querySelectorAll(selector);
            found.forEach(card => {
                if (!allCards.includes(card)) {
                    allCards.push(card);
                }
            });
        });
        
        console.log(`📦 Encontradas ${allCards.length} tarjetas de tipo`);
        
        allCards.forEach((card, index) => {
            const fullText = card.textContent || card.innerText || '';
            
            if (fullText && fullText.trim() !== '') {
                let cleanType = '';
                
                // Detectar el tipo exacto
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
                    // Extraer primera palabra limpia
                    const words = fullText.trim().split(/\s+/);
                    cleanType = words[0];
                }
                
                // SOLO TEXTO LIMPIO - Sin iconos, sin descripciones
                if (cleanType) {
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
                            font-family: 'Inter', sans-serif;
                        ">
                            ${cleanType}
                        </div>
                    `;
                    
                    console.log(`✅ ${index + 1}. "${fullText.substring(0, 30)}..." → "${cleanType}"`);
                }
            }
        });
        
        isProcessing = false;
        console.log(`🎯 Procesamiento completado: ${allCards.length} tarjetas`);
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanTypeTextFinal);
    } else {
        cleanTypeTextFinal();
    }
    
    // Ejecutar con intervalos espaciados para evitar conflictos
    setTimeout(cleanTypeTextFinal, 200);
    setTimeout(cleanTypeTextFinal, 800);
    setTimeout(cleanTypeTextFinal, 2000);
    
    // Observer simple y eficiente
    const observer = new MutationObserver(function(mutations) {
        let shouldClean = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.id && node.id.includes('type')) {
                            shouldClean = true;
                        }
                        if (node.querySelector && node.querySelector('[id*="type"]')) {
                            shouldClean = true;
                        }
                    }
                });
            }
        });
        
        if (shouldClean) {
            setTimeout(cleanTypeTextFinal, 300);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('🚀 Script FINAL de limpieza de tipos activado');
})();