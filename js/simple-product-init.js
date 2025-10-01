// Script simple y limpio para inicializar la página de producto
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Inicializando página de producto...');
    
    // Inicializar contador del carrito
    try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
        cartCountElements.forEach(element => {
            if (element) {
                element.textContent = totalItems;
            }
        });
        
        console.log('✅ Contador de carrito inicializado:', totalItems);
    } catch (error) {
        console.error('❌ Error al inicializar carrito:', error);
    }
    
    // Función simple para mejorar opciones de tamaño
    function improveOptions() {
        try {
            // Mejorar opciones de tamaño
            const sizeCards = document.querySelectorAll('#size-options .option-card');
            sizeCards.forEach((card, index) => {
                const text = card.textContent || '';
                
                if (text.includes('gr$')) {
                    const match = text.match(/(\d+)\s*gr\$(\d+)\s*MXN/);
                    if (match) {
                        const size = match[1];
                        const price = match[2];
                        
                        card.innerHTML = `
                            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0.5rem;">
                                <span style="font-size: 1rem; font-weight: 600; color: #2D3E33;">${size} gr</span>
                                <span style="background: #A3B18A; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">$${price} MXN</span>
                            </div>
                        `;
                    }
                }
            });
            
            console.log('✅ Opciones de tamaño mejoradas:', sizeCards.length);
        } catch (error) {
            console.error('❌ Error al mejorar opciones:', error);
        }
    }
    
    // Ejecutar mejoras con retraso
    setTimeout(improveOptions, 500);
    setTimeout(improveOptions, 1500);
    
    // Observer simple para cambios
    try {
        const observer = new MutationObserver(function(mutations) {
            let shouldImprove = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldImprove = true;
                }
            });
            if (shouldImprove) {
                setTimeout(improveOptions, 200);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('✅ Observer activado');
    } catch (error) {
        console.error('❌ Error al crear observer:', error);
    }
    
    console.log('🎉 Página de producto inicializada correctamente');
});