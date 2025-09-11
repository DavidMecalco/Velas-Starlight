/**
 * ========================================
 * GENERADOR DE PRODUCTOS - DISEÑO ORIGINAL
 * Velas Starlight - Product Generator
 * ========================================
 */

class ProductGenerator {
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
        this.products = products || [];
        this.filteredProducts = [...this.products];
        this.container = document.getElementById(containerId);
        
        if (!this.container) {
            console.error('❌ Contenedor no encontrado:', containerId);
            return;
        }
        
        this.render();
        this.updateStats();
        console.log(`✅ ProductGenerator inicializado con ${this.products.length} productos`);
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
        if (!this.container) return;
        
        if (this.filteredProducts.length === 0) {
            this.container.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <div class="text-gray-400 text-6xl mb-4">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
                    <p class="text-gray-500">Intenta con otros términos de búsqueda o categoría</p>
                </div>
            `;
            return;
        }
        
        // Mezclar productos aleatoriamente antes de renderizar
        const shuffledProducts = [...this.filteredProducts].sort(() => Math.random() - 0.5);
        
        this.container.innerHTML = shuffledProducts.map(product => this.generateProductCard(product)).join('');
    }

    /**
     * Generar tarjeta de producto - DISEÑO ORIGINAL CORREGIDO
     */
    generateProductCard(product) {
        const imageUrl = this.getProductImage(product);
        const minPrice = this.getMinPrice(product);
        const badges = this.generateBadges(product);
        const productInfo = this.generateProductInfo(product);
        
        return `
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer" 
                 onclick="window.location.href='producto-detalle.html?id=${product.id}'">
                
                <!-- Imagen del producto -->
                <div class="relative overflow-hidden h-64">
                    <img src="${imageUrl}" 
                         alt="${product.title}" 
                         class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                         onerror="this.src='../images/placeholder-vela.jpg'">
                    
                    <!-- Badges -->
                    <div class="absolute top-3 left-3 flex flex-col space-y-2">
                        ${badges}
                    </div>
                    
                    <!-- Categoría en esquina superior derecha -->
                    <div class="absolute top-3 right-3">
                        <span class="bg-sage-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                            ${product.category}
                        </span>
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="p-6 flex flex-col h-auto">
                    <!-- Título -->
                    <h3 class="text-xl font-bold text-dark-green mb-3 line-clamp-2 min-h-[3.5rem]">
                        ${product.title}
                    </h3>
                    
                    <!-- Descripción corta -->
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                        ${product.description}
                    </p>
                    
                    <!-- Información del producto -->
                    <div class="space-y-2 mb-4">
                        ${productInfo}
                    </div>
                    
                    <!-- Precio y botón -->
                    <div class="mt-auto">
                        <div class="text-center mb-4">
                            <span class="text-sm text-gray-600">Desde </span>
                            <span class="text-2xl font-bold text-sage-green">$${minPrice} MXN</span>
                        </div>
                        
                        <button class="w-full bg-sage-green text-white py-3 px-6 rounded-full font-semibold hover:bg-dark-green transition-all duration-300 transform hover:scale-105"
                                onclick="event.stopPropagation(); window.location.href='producto-detalle.html?id=${product.id}'">
                            <i class="fas fa-shopping-cart mr-2"></i>Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Obtener imagen del producto
     */
    getProductImage(product) {
        // Si tiene datos de imagen base64, usarla
        if (product.imageData && product.imageData.base64) {
            console.log(`🖼️ Usando imagen base64 para: ${product.title}`);
            return product.imageData.base64;
        }
        
        // Si no, usar la URL normal
        const imageUrl = product.image || '../images/placeholder-vela.jpg';
        console.log(`🖼️ Usando URL de imagen para ${product.title}: ${imageUrl}`);
        return imageUrl;
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
     * Generar badges
     */
    generateBadges(product) {
        const badges = [];
        
        if (product.new) {
            badges.push('<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Nuevo</span>');
        }
        
        if (product.featured) {
            badges.push('<span class="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Destacado</span>');
        }
        
        if (!product.available) {
            badges.push('<span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Agotado</span>');
        }
        
        return badges.join('');
    }

    /**
     * Generar información del producto
     */
    generateProductInfo(product) {
        const info = [];
        
        // Precio desde
        const minPrice = this.getMinPrice(product);
        
        // Fragancias
        if (product.fragrances && product.fragrances.length > 0) {
            info.push(`
                <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-palette text-purple-500 mr-2"></i>
                    <span>${product.fragrances.length} fragancia${product.fragrances.length !== 1 ? 's' : ''}</span>
                </div>
            `);
        }
        
        // Tamaños
        if (product.sizes && product.sizes.length > 0) {
            info.push(`
                <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-weight text-blue-500 mr-2"></i>
                    <span>${product.sizes.length} tamaño${product.sizes.length !== 1 ? 's' : ''}</span>
                </div>
            `);
        }
        
        return info.join('');
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
     * Actualizar estadísticas
     */
    updateStats() {
        const statsProducts = document.getElementById('stats-products');
        const statsFragrances = document.getElementById('stats-fragrances');
        const statsTypes = document.getElementById('stats-types');
        
        if (statsProducts) {
            statsProducts.textContent = this.products.length;
        }
        
        if (statsFragrances) {
            // Contar fragancias únicas
            const allFragrances = new Set();
            this.products.forEach(product => {
                if (product.fragrances) {
                    product.fragrances.forEach(fragrance => allFragrances.add(fragrance));
                }
            });
            statsFragrances.textContent = allFragrances.size + '+';
        }
        
        if (statsTypes) {
            // Contar tipos únicos
            const allTypes = new Set();
            this.products.forEach(product => {
                if (product.types) {
                    product.types.forEach(type => allTypes.add(type));
                }
            });
            statsTypes.textContent = allTypes.size;
        }
    }
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.ProductGenerator = ProductGenerator;
}