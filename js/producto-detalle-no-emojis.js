// Script para mejorar opciones sin emojis - Solo iconos Font Awesome
document.addEventListener('DOMContentLoaded', function () {
    // Mejorar opciones de tipo
    function enhanceTypeOptions() {
        const typeCards = document.querySelectorAll('#type-options .option-card');
        typeCards.forEach(card => {
            const text = card.textContent.trim();
            if (text && !card.querySelector('.type-icon')) {
                let cleanType = '';
                let icon = '<i class="fas fa-fire"></i>'; // Icono por defecto
                let description = 'Material premium';

                // Limpiar el texto y extraer solo el tipo exacto
                if (text.toLowerCase().includes('parafina')) {
                    cleanType = 'Parafina';
                    icon = '<i class="fas fa-fire"></i>';
                    description = 'Cera de parafina';
                } else if (text.toLowerCase().includes('soya')) {
                    cleanType = 'Soya';
                    icon = '<i class="fas fa-leaf"></i>';
                    description = 'Cera de soya';
                } else if (text.toLowerCase().includes('origen natural')) {
                    cleanType = 'Origen Natural';
                    icon = '<i class="fas fa-seedling"></i>';
                    description = 'Ingredientes naturales';
                } else if (text.toLowerCase().includes('cera de abeja')) {
                    cleanType = 'Cera de Abeja';
                    icon = '<i class="fas fa-hexagon"></i>';
                    description = 'Cera natural';
                } else {
                    // Extraer solo el tipo principal, eliminar texto extra
                    const words = text.split(' ');
                    if (words.length >= 2 && words[0].toLowerCase() === 'origen') {
                        cleanType = 'Origen Natural';
                        icon = '<i class="fas fa-seedling"></i>';
                        description = 'Ingredientes naturales';
                    } else {
                        cleanType = words[0]; // Solo la primera palabra
                    }
                }

                card.innerHTML = `
                    <div class="type-icon">${icon}</div>
                    <div class="type-name">${cleanType}</div>
                    <div class="type-description">${description}</div>
                `;
            }
        });
    }

    // Mejorar opciones de tamaño
    function enhanceSizeOptions() {
        const sizeCards = document.querySelectorAll('#size-options .option-card');
        sizeCards.forEach(card => {
            const originalText = card.textContent || card.innerText;

            if (originalText && originalText.includes('gr$') && !card.querySelector('.size-info')) {
                const match = originalText.match(/(\d+)\s*gr\$(\d+)\s*MXN/);
                if (match) {
                    const size = match[1];
                    const price = match[2];

                    card.innerHTML = `
                        <div class="size-info">
                            <div class="size-icon">${size}</div>
                            <div class="size-details">
                                <div class="size-label">${size} gramos</div>
                                <div class="size-weight">Tamaño estándar</div>
                            </div>
                        </div>
                        <div class="price-tag">$${price} MXN</div>
                    `;
                }
            }
        });
    }

    // Mejorar ingredientes (sin emojis)
    function enhanceIngredients() {
        const ingredientItems = document.querySelectorAll('.ingredients-list .ingredient-item');
        ingredientItems.forEach(item => {
            const text = item.textContent.trim();

            // Buscar patrones como "Cera Parafina 100% Sintético"
            const match = text.match(/^(.+?)\s+(\d+%)\s+(.+)$/);
            if (match && !item.querySelector('.ingredient-name')) {
                const name = match[1];
                const percentage = match[2];
                const type = match[3];

                item.innerHTML = `
                    <div class="ingredient-name">${name}</div>
                    <div class="ingredient-percentage">${percentage}</div>
                    <div class="ingredient-type">${type}</div>
                `;
            }
        });
    }

    // Ejecutar mejoras
    setTimeout(enhanceTypeOptions, 200);
    setTimeout(enhanceSizeOptions, 200);
    setTimeout(enhanceIngredients, 200);
    setTimeout(enhanceTypeOptions, 800);
    setTimeout(enhanceSizeOptions, 800);
    setTimeout(enhanceIngredients, 800);
    setTimeout(enhanceTypeOptions, 1500);
    setTimeout(enhanceSizeOptions, 1500);
    setTimeout(enhanceIngredients, 1500);

    // Observer para cambios dinámicos
    const observer = new MutationObserver(function (mutations) {
        let shouldEnhance = false;
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldEnhance = true;
            }
        });
        if (shouldEnhance) {
            setTimeout(enhanceTypeOptions, 100);
            setTimeout(enhanceSizeOptions, 100);
            setTimeout(enhanceIngredients, 100);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('✅ Mejoras aplicadas sin emojis - Solo iconos Font Awesome');
});