/**
 * Generador de productos simplificado para emergencias
 */

function SimpleProductGenerator() {
    this.products = [];
}

SimpleProductGenerator.prototype.init = function(containerId, products) {
    console.log('🚀 Inicializando generador simple...');
    
    this.products = products || [];
    this.container = document.getElementById(containerId);
    
    if (!this.container) {
        console.error('❌ Contenedor no encontrado:', containerId);
        return;
    }
    
    this.render();
    console.log(`✅ Generador simple inicializado con ${this.products.length} productos`);
};

SimpleProductGenerator.prototype.render = function() {
    if (!this.container || !this.products || this.products.length === 0) {
        console.error('❌ No hay productos para renderizar');
        return;
    }
    
    console.log(`🎨 Renderizando ${this.products.length} productos...`);
    
    const html = this.products.map(product => this.generateSimpleCard(product)).join('');
    this.container.innerHTML = html;
    
    console.log('✅ Productos renderizados');
};

SimpleProductGenerator.prototype.generateSimpleCard = function(product) {
    if (!product.id || !product.title) {
        console.warn('⚠️ Producto inválido:', product);
        return '';
    }
    
    const price = product.sizes && product.sizes.length > 0 ? product.sizes[0].price : 'N/A';
    const image = product.image || '../images/placeholder-vela.jpg';
    
    return `
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
             onclick="window.location.href='producto-detalle.html?id=${product.id}'">
            <div class="aspect-square overflow-hidden bg-gray-100">
                <img src="${image}" 
                     alt="${product.title}" 
                     class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                     onerror="this.src='../images/placeholder-vela.jpg'">
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">${product.title}</h3>
                <div class="bg-green-600 text-white px-4 py-2 rounded-lg text-center mb-4">
                    <span class="text-sm">Desde </span>
                    <span class="text-lg font-bold">$${price} MXN</span>
                </div>
                <button class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        onclick="event.stopPropagation(); window.location.href='producto-detalle.html?id=${product.id}'">
                    <i class="fas fa-eye mr-2"></i>Ver Producto
                </button>
            </div>
        </div>
    `;
};

// Hacer disponible globalmente
window.SimpleProductGenerator = SimpleProductGenerator;

// Función de emergencia para usar el generador simple
window.useSimpleGenerator = function() {
    console.log('🚨 Usando generador simple de emergencia');
    
    if (window.productosData && window.productosData.length > 0) {
        const simpleGenerator = new SimpleProductGenerator();
        simpleGenerator.init('product-grid', window.productosData);
        window.productGenerator = simpleGenerator;
        return true;
    }
    
    return false;
};