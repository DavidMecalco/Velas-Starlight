/**
 * CARRITO CORE - FUNCIONALIDAD CONSOLIDADA
 * Velas Starlight - Todas las funciones esenciales del carrito en un solo archivo
 */

(function() {
    'use strict';
    
    console.log('🛒 Inicializando Carrito Core...');
    
    // ==========================================
    // 1. LIMPIEZA INICIAL DEL CARRITO
    // ==========================================
    
    function cleanupCart() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            // Filtrar productos válidos (eliminar productos de prueba)
            const validProducts = cart.filter(item => {
                const hasRequiredFields = item.title && item.price && item.quantity;
                const isNotTestProduct = !item.title.toLowerCase().includes('prueba') && 
                                       !item.title.toLowerCase().includes('test') &&
                                       item.title !== 'Prueba 1';
                const hasValidPrice = !isNaN(item.price) && item.price > 0;
                
                return hasRequiredFields && isNotTestProduct && hasValidPrice;
            });
            
            if (validProducts.length !== cart.length) {
                localStorage.setItem('cart', JSON.stringify(validProducts));
                console.log('🧹 Productos inválidos eliminados del carrito');
            }
            
            return validProducts;
        } catch (error) {
            console.error('❌ Error limpiando carrito:', error);
            localStorage.setItem('cart', JSON.stringify([]));
            return [];
        }
    }
    
    // ==========================================
    // 2. MENÚ MÓVIL - DELEGADO AL SCRIPT UNIFICADO
    // ==========================================
    
    // El menú móvil ahora es manejado por menu-mobile-unified.js
    // Esta función solo verifica que esté funcionando
    function checkMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuToggle && mobileMenu) {
            console.log('📱 Elementos del menú encontrados - delegando a script unificado');
            return true;
        } else {
            console.log('📱 Elementos del menú no encontrados');
            return false;
        }
    }
    
    // ==========================================
    // 3. VISUALIZACIÓN DEL CARRITO
    // ==========================================
    
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const container = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');
        const itemsCount = document.getElementById('cart-items-count');
        
        if (cart.length === 0) {
            if (container) container.style.display = 'none';
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (itemsCount) itemsCount.textContent = '0';
            updateTotals(0, 0);
            return;
        }
        
        if (container) container.style.display = 'block';
        if (emptyMessage) emptyMessage.style.display = 'none';
        if (itemsCount) itemsCount.textContent = cart.length;
        if (container) container.innerHTML = '';
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            // Validar y limpiar datos del producto
            const title = item.title || 'Producto sin nombre';
            const image = item.image || '../images/placeholder.jpg';
            const category = item.category || 'Vela';
            const fragrance = item.fragrance || 'Sin fragancia';
            const quantity = parseInt(item.quantity) || 1;
            const type = item.type || 'Soya';
            
            // Manejar el tamaño correctamente
            let sizeDisplay = '45 gr';
            if (item.size) {
                if (typeof item.size === 'string') {
                    sizeDisplay = item.size;
                } else if (item.size.label) {
                    sizeDisplay = item.size.label;
                }
            }
            
            // Calcular precio correctamente
            let unitPrice = 60; // precio por defecto
            if (item.price && !isNaN(item.price)) {
                unitPrice = parseFloat(item.price);
            } else if (item.unitPrice && !isNaN(item.unitPrice)) {
                unitPrice = parseFloat(item.unitPrice);
            } else if (item.size && item.size.price && !isNaN(item.size.price)) {
                unitPrice = parseFloat(item.size.price);
            }
            
            const itemTotal = unitPrice * quantity;
            subtotal += itemTotal;
            
            // Crear elemento del producto
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-4';
            itemElement.innerHTML = `
                <div class="flex-shrink-0">
                    <img src="${image}" alt="${title}" class="w-20 h-20 object-cover rounded-lg" onerror="this.src='../images/placeholder.jpg'">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-dark-green text-lg mb-2">${title}</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p><i class="fas fa-tag mr-2"></i>Categoría: ${category}</p>
                        <p><i class="fas fa-leaf mr-2"></i>Tipo: ${type}</p>
                        <p><i class="fas fa-weight mr-2"></i>Tamaño: ${sizeDisplay}</p>
                        <p><i class="fas fa-palette mr-2"></i>Fragancia: ${fragrance}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <button onclick="window.changeQuantity(${index}, -1)" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <i class="fas fa-minus text-sm"></i>
                        </button>
                        <span class="w-12 text-center font-semibold">${quantity}</span>
                        <button onclick="window.changeQuantity(${index}, 1)" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                            <i class="fas fa-plus text-sm"></i>
                        </button>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-dark-green">$${itemTotal.toFixed(2)} MXN</div>
                        <div class="text-sm text-gray-500">$${unitPrice.toFixed(2)} c/u</div>
                    </div>
                    <button onclick="window.removeFromCart(${index})" class="text-red-500 hover:text-red-700 transition-colors p-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            if (container) {
                container.appendChild(itemElement);
            }
        });
        
        updateTotals(subtotal, cart.length);
    }
    
    // ==========================================
    // 4. FUNCIONES DEL CARRITO
    // ==========================================
    
    function updateTotals(subtotal, itemCount) {
        // Cargar costo de envío desde configuración
        let shippingCost = 50; // valor por defecto
        try {
            const shippingConfig = localStorage.getItem('starlightShippingConfig');
            if (shippingConfig) {
                const config = JSON.parse(shippingConfig);
                shippingCost = config.standard.cost || 50;
            }
        } catch (error) {
            console.error('❌ Error cargando configuración de envío:', error);
        }
        
        const shipping = itemCount > 0 ? (window.currentShippingCost || shippingCost) : 0;
        const discountApplied = window.discountApplied || false;
        const discountPercentage = window.discountPercentage || 0;
        const discountAmount = discountApplied ? (subtotal * discountPercentage / 100) : 0;
        const total = subtotal + shipping - discountAmount;
        
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping');
        const discountEl = document.getElementById('discount');
        const totalEl = document.getElementById('total');
        
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)} MXN`;
        if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)} MXN`;
        if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)} MXN`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)} MXN`;
        
        updateOrderSummary(subtotal, shipping, discountAmount, total, itemCount);
    }
    
    function updateOrderSummary(subtotal, shipping, discount, total, itemCount) {
        const orderSummary = document.getElementById('order-summary');
        if (orderSummary) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const totalUnits = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
            
            orderSummary.innerHTML = `
                <div class="space-y-4 mb-6">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-semibold">$${subtotal.toFixed(2)} MXN</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Envío:</span>
                        <span class="font-semibold">$${shipping.toFixed(2)} MXN</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Descuento:</span>
                        <span class="font-semibold text-green-600">-$${discount.toFixed(2)} MXN</span>
                    </div>
                    <hr class="border-gray-200">
                    <div class="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span class="text-dark-green">$${total.toFixed(2)} MXN</span>
                    </div>
                    <div class="text-sm text-gray-500 mt-2">
                        <p>${itemCount} productos • ${totalUnits} unidades</p>
                    </div>
                </div>
            `;
        }
    }
    
    function changeQuantity(index, change) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart[index]) {
            const newQuantity = (parseInt(cart[index].quantity) || 1) + change;
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCartCount();
            }
        }
    }
    
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart[index]) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        }
    }
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
        
        const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
        cartCountElements.forEach(element => {
            if (element) {
                element.textContent = totalItems;
            }
        });
    }
    
    // ==========================================
    // 5. INICIALIZACIÓN
    // ==========================================
    
    function init() {
        console.log('🚀 Inicializando funcionalidades del carrito...');
        
        // 1. Limpiar carrito
        cleanupCart();
        
        // 2. Verificar menú móvil (manejado por script unificado)
        checkMobileMenu();
        
        // 3. Mostrar productos del carrito
        setTimeout(() => {
            displayCartItems();
            updateCartCount();
        }, 200);
        
        console.log('✅ Carrito Core inicializado correctamente');
    }
    
    // ==========================================
    // 6. EXPORTAR FUNCIONES GLOBALES
    // ==========================================
    
    window.displayCartItems = displayCartItems;
    window.changeQuantity = changeQuantity;
    window.removeFromCart = removeFromCart;
    window.updateCartCount = updateCartCount;
    
    // ==========================================
    // 7. AUTO-INICIALIZACIÓN
    // ==========================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // También ejecutar después de un delay para asegurar compatibilidad
    setTimeout(init, 100);
    
})();