/**
 * ========================================
 * GENERADOR DE PRODUCTOS MEJORADO
 * Velas Starlight - Enhanced Product Generator
 * ========================================
 */

class EnhancedProductGenerator {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentSearch = '';
    }

    /**
     * Inicializar el generador
     */
    init(containerId, products) {
        this.products = this.normalizeProducts(products || []);
        this.filteredProducts = [...this.products];
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error('❌ Contenedor no encontrado:', containerId);
            return;
        }

        // Debug: Verificar temáticas en productos originales
        console.log('🔍 Verificando temáticas en productos originales:');
        this.products.forEach((product, index) => {
            if (product.theme) {
                console.log(`🎭 TEMÁTICA ENCONTRADA: ${product.title} - ${product.theme} (ID: ${product.id})`);
            }
        });

        this.render();
        this.updateStats();
        console.log(`✅ EnhancedProductGenerator inicializado con ${this.products.length} productos`);
    }

    /**
     * Normalizar productos para asegurar que tengan todos los campos
     */
    normalizeProducts(products) {
        return products.map(product => ({
            ...product,
            bestseller: product.bestseller || false,
            theme: product.theme || null,
            promotion2x1: product.promotion2x1 || false,
            specialDiscount: product.specialDiscount || null,
            ingredients: product.ingredients || []
        }));
    }

    /**
     * Filtrar productos por categoría
     */
    filterByCategory(category) {
        this.currentCategory = category;
        this.applyFilters();
    }

    /**
     * Filtrar productos por búsqueda
     */
    filterBySearch(searchTerm) {
        this.currentSearch = searchTerm.toLowerCase();
        this.applyFilters();
    }

    /**
     * Aplicar todos los filtros
     */
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Filtro por categoría
            const categoryMatch = this.currentCategory === 'all' || product.category === this.currentCategory;

            // Filtro por búsqueda
            const searchMatch = !this.currentSearch ||
                product.title.toLowerCase().includes(this.currentSearch) ||
                product.description.toLowerCase().includes(this.currentSearch) ||
                (product.fragrances && product.fragrances.some(f => f.toLowerCase().includes(this.currentSearch)));

            return categoryMatch && searchMatch;
        });

        this.render();

        // Actualizar contador si existe la función
        if (typeof window.updateResultsCount === 'function') {
            window.updateResultsCount(this.filteredProducts.length);
        }
    }

    /**
     * Renderizar productos
     */
    render() {
        if (!this.container) {
            console.error('❌ Contenedor no encontrado para renderizar');
            return;
        }

        console.log(`🔄 Renderizando ${this.filteredProducts.length} productos`);
        
        // Debug: Mostrar todos los productos con temática
        const productsWithTheme = this.filteredProducts.filter(p => p.theme);
        console.log(`🎭 Productos con temática encontrados: ${productsWithTheme.length}`);
        productsWithTheme.forEach(p => {
            console.log(`  - ${p.title}: ${p.theme} (ID: ${p.id})`);
        });

        if (this.filteredProducts.length === 0) {
            console.log('⚠️ No hay productos para mostrar');
            this.showNoResults();
            return;
        }

        // Mezclar productos aleatoriamente antes de renderizar
        const shuffledProducts = [...this.filteredProducts].sort(() => Math.random() - 0.5);

        try {
            const productCards = shuffledProducts.map((product, index) => {
                const card = this.generateProductCard(product, index);
                if (!card) {
                    console.warn('⚠️ Tarjeta vacía para producto:', product.title || product.id);
                }
                return card;
            }).filter(card => card); // Filtrar tarjetas vacías

            console.log(`✅ Generadas ${productCards.length} tarjetas de productos`);
            this.container.innerHTML = productCards.join('');

            // Aplicar efectos después del render
            setTimeout(() => {
                this.applyEnhancedEffects();
            }, 100);
        } catch (error) {
            console.error('❌ Error en render:', error);
            this.container.innerHTML = '<div class="col-span-full text-center text-red-500">Error cargando productos</div>';
        }
    }

    /**
     * Mostrar mensaje de no resultados
     */
    showNoResults() {
        this.container.innerHTML = `
            <div class="col-span-full">
                <div class="no-results-container">
                    <div class="no-results-icon">🔍</div>
                    <h3 class="no-results-title">No se encontraron productos</h3>
                    <p class="no-results-description">
                        Intenta ajustar tus filtros o buscar con otros términos. 
                        Tenemos una gran variedad de productos esperándote.
                    </p>
                    <button class="btn-show-all" onclick="this.resetFilters()">
                        <i class="fas fa-eye mr-2"></i>Ver Todos los Productos
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Generar tarjeta de producto mejorada
     */
    generateProductCard(product, index) {
        try {
            // Validar que el producto tenga ID
            if (!product.id) {
                console.error('❌ Producto sin ID:', product);
                return '';
            }

            // Validar campos básicos
            if (!product.title) {
                console.error('❌ Producto sin título:', product);
                return '';
            }

            const imageUrl = this.getProductImage(product);
            const minPrice = this.getMinPrice(product);
            const badges = this.generateBadges(product);
            const productInfo = this.generateProductInfo(product);
            const animationDelay = (index * 0.1).toFixed(1);
            
            // Debug: Log productos con temática
            if (product.theme) {
                console.log(`🎭 Producto con temática encontrado: ${product.title} - Temática: ${product.theme}`);
            }

        return `
            <div class="product-card" 
                 onclick="if(event.target.tagName !== 'BUTTON' && event.target.tagName !== 'I') { window.location.href='producto-detalle.html?id=${product.id}'; }"
                 style="cursor: pointer;">
                
                <!-- Imagen del producto -->
                <div class="product-image-container">
                    <img src="${imageUrl}" 
                         alt="${product.title}" 
                         class="product-image"
                         loading="lazy"
                         onerror="this.src='../images/placeholder-vela.jpg'">
                    
                    <!-- Badges -->
                    <div class="badges-container">
                        ${badges}
                    </div>
                    
                    <!-- Categoría -->
                    <div class="category-badge">
                        ${product.category}
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="product-info">
                    <!-- Título -->
                    <h3 class="product-title">
                        ${product.title}
                    </h3>
                    
                    <!-- Precio -->
                    <div class="product-price">
                        <div style="font-size: 0.875rem; opacity: 0.9;">Desde</div>
                        <div style="font-size: 1.25rem; font-weight: 800;">${minPrice} MXN</div>
                    </div>
                    
                    <!-- Temática (solo el badge, sin marco) -->
                    ${product.theme ? (() => {
                        const themeInfo = this.getThemeInfo(product.theme);
                        return `
                            <div class="product-theme">
                                <span class="theme-badge" style="background: ${themeInfo.color};">
                                    <span class="theme-emoji">${themeInfo.emoji}</span>
                                    ${product.theme}
                                </span>
                            </div>
                        `;
                    })() : `<div class="product-theme-placeholder"></div>`}
                    
                    <!-- Características -->
                    <div class="product-features">
                        ${productInfo}
                    </div>
                    
                    <!-- Botones de acción -->
                    <div class="product-actions">
                        <button class="btn-view-product"
                                onclick="event.stopPropagation(); window.location.href='producto-detalle.html?id=${product.id}'"
                                aria-label="Ver detalles de ${product.title}"
                                type="button">
                            <i class="fas fa-eye"></i>
                            <span>Ver Detalles</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        } catch (error) {
            console.error('❌ Error generando tarjeta de producto:', error, product);
            return '';
        }
    }

    /**
     * Obtener imagen del producto
     */
    getProductImage(product) {
        // Si tiene datos de imagen base64, usarla
        if (product.imageData && product.imageData.base64) {
            return product.imageData.base64;
        }

        // Si no, usar la URL normal
        return product.image || '../images/placeholder-vela.jpg';
    }

    /**
     * Obtener precio mínimo
     */
    getMinPrice(product) {
        if (!product.sizes || product.sizes.length === 0) {
            return '0.00';
        }

        const prices = product.sizes.map(size => parseFloat(size.price) || 0);
        return Math.min(...prices).toFixed(2);
    }

    /**
     * Generar badges mejorados
     */
    generateBadges(product) {
        const badges = [];

        // Promociones especiales (prioridad alta)
        if (product.promotion2x1) {
            badges.push(`
                <span class="product-badge promotion">
                    <i class="fas fa-gift"></i>2x1
                </span>
            `);
        }

        if (product.specialDiscount) {
            badges.push(`
                <span class="product-badge discount">
                    <i class="fas fa-percentage"></i>${product.specialDiscount.percentage}% OFF
                </span>
            `);
        }

        // Estados del producto
        if (product.new) {
            badges.push(`
                <span class="product-badge new">
                    <i class="fas fa-star"></i>Nuevo
                </span>
            `);
        }

        if (product.featured) {
            badges.push(`
                <span class="product-badge featured">
                    <i class="fas fa-crown"></i>Destacado
                </span>
            `);
        }

        if (product.bestseller) {
            badges.push(`
                <span class="product-badge bestseller">
                    <i class="fas fa-fire"></i>Más Vendido
                </span>
            `);
        }

        if (!product.available) {
            badges.push(`
                <span class="product-badge" style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);">
                    <i class="fas fa-times"></i>Agotado
                </span>
            `);
        }

        return badges.join('');
    }

    /**
     * Obtener emoji y estilo para temática
     */
    getThemeInfo(theme) {
        const themes = {
            'Navidad': { emoji: '🎄', color: '#dc2626', bgColor: '#fef2f2' },
            'Día de Muertos': { emoji: '💀', color: '#7c3aed', bgColor: '#faf5ff' },
            'San Valentín': { emoji: '💕', color: '#ec4899', bgColor: '#fdf2f8' },
            'Halloween': { emoji: '🎃', color: '#ea580c', bgColor: '#fff7ed' },
            'Primavera': { emoji: '🌸', color: '#10b981', bgColor: '#f0fdf4' },
            'Verano': { emoji: '☀️', color: '#f59e0b', bgColor: '#fffbeb' },
            'Otoño': { emoji: '🍂', color: '#92400e', bgColor: '#fef3c7' },
            'Invierno': { emoji: '❄️', color: '#3b82f6', bgColor: '#eff6ff' }
        };
        
        return themes[theme] || { emoji: '🎉', color: '#6b7280', bgColor: '#f9fafb' };
    }

    /**
     * Generar información del producto mejorada con iconos coloridos
     */
    generateProductInfo(product) {
        const info = [];

        // Fragancias
        if (product.fragrances && product.fragrances.length > 0) {
            const fragranceText = product.fragrances.length === 1
                ? product.fragrances[0]
                : `${product.fragrances.length} fragancias`;

            info.push(`
                <div class="feature-item">
                    <i class="feature-icon fas fa-palette"></i>
                    <span>${fragranceText}</span>
                </div>
            `);
        }

        // Tamaños
        if (product.sizes && product.sizes.length > 0) {
            info.push(`
                <div class="feature-item">
                    <i class="feature-icon fas fa-weight"></i>
                    <span>${product.sizes.length} tamaño${product.sizes.length !== 1 ? 's' : ''}</span>
                </div>
            `);
        }

        // Tipo de cera
        if (product.types && product.types.length > 0) {
            info.push(`
                <div class="feature-item">
                    <i class="feature-icon fas fa-leaf"></i>
                    <span>${product.types[0]}</span>
                </div>
            `);
        }

        // Tiempo de quemado estimado
        if (product.burnTime) {
            info.push(`
                <div class="feature-item">
                    <i class="feature-icon fas fa-clock"></i>
                    <span>${product.burnTime}h de duración</span>
                </div>
            `);
        }

        return info.join('');
    }

    /**
     * Aplicar efectos simples después del render
     */
    applyEnhancedEffects() {
        // Efectos simples ya están manejados por CSS
        console.log('✅ Efectos aplicados a las tarjetas de productos');
    }



    /**
     * Actualizar productos
     */
    updateProducts(newProducts) {
        this.products = newProducts || [];
        this.applyFilters();
    }

    /**
     * Buscar productos por fragancia
     */
    searchProducts(searchTerm) {
        this.filterBySearch(searchTerm);
    }

    /**
     * Resetear filtros
     */
    resetFilters() {
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.applyFilters();

        // Resetear UI
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }

        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.classList.remove('filter-active');
            if (btn.dataset.category === 'all') {
                btn.classList.add('filter-active');
            }
        });
    }

    /**
     * Actualizar estadísticas con animación
     */
    updateStats() {
        const statsProducts = document.getElementById('stats-products');
        const statsFragrances = document.getElementById('stats-fragrances');
        const statsTypes = document.getElementById('stats-types');

        if (statsProducts) {
            this.animateNumber(statsProducts, this.products.length);
        }

        if (statsFragrances) {
            // Contar fragancias únicas
            const allFragrances = new Set();
            this.products.forEach(product => {
                if (product.fragrances) {
                    product.fragrances.forEach(fragrance => allFragrances.add(fragrance));
                }
            });
            this.animateNumber(statsFragrances, allFragrances.size);
        }

        if (statsTypes) {
            // Contar tipos únicos
            const allTypes = new Set();
            this.products.forEach(product => {
                if (product.types) {
                    product.types.forEach(type => allTypes.add(type));
                }
            });
            this.animateNumber(statsTypes, allTypes.size);
        }
    }

    /**
     * Animar números
     */
    animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.EnhancedProductGenerator = EnhancedProductGenerator;
}