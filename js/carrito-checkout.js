/**
 * CARRITO CHECKOUT
 * Velas Starlight - Funcionalidad específica del proceso de checkout
 */

(function() {
    'use strict';
    
    console.log('🛒 Inicializando checkout del carrito...');
    
    let discountApplied = false;
    let discountPercentage = 0;
    let currentShippingCost = 50;
    
    function loadCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    
    // Función para mostrar notificaciones elegantes
    function showNotification(message, type = 'info') {
        // Remover notificaciones existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icon = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'info' ? 'ℹ️' : '🗑️';

        notification.innerHTML = `
            <div class="flex items-center">
                <span class="text-xl mr-3">${icon}</span>
                <span>${message}</span>
            </div>
            <button class="close-btn" onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto-remover después de 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    function updateFinalOrderSummary() {
        const cart = loadCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
        const shipping = cart.length > 0 ? currentShippingCost : 0;
        const discountAmount = discountApplied ? (subtotal * discountPercentage / 100) : 0;
        const total = subtotal + shipping - discountAmount;
        const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

        const finalSummary = document.getElementById('final-order-summary');
        if (finalSummary) {
            finalSummary.innerHTML = `
                <div class="space-y-4 mb-6">
                    <h4 class="font-semibold text-dark-green mb-4">Productos:</h4>
                    ${cart.map(item => {
                let typeDisplay = item.type || 'N/A';
                if (item.category === 'Belleza') {
                    if (item.careType) {
                        typeDisplay = `Cuidado ${item.careType}`;
                    } else if (window.productosData) {
                        const originalProduct = window.productosData.find(p => p.id === item.id);
                        if (originalProduct && originalProduct.careType) {
                            typeDisplay = `Cuidado ${originalProduct.careType}`;
                        }
                    }
                }

                return `
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <div class="flex-1">
                                    <p class="font-medium">${item.title}</p>
                                    <p class="text-sm text-gray-600">${typeDisplay} • ${item.size.label} • ${item.fragrance}</p>
                                    <p class="text-sm text-gray-500">Cantidad: ${item.quantity}</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold">${(item.total || (item.unitPrice || item.size.price) * item.quantity).toFixed(2)} MXN</p>
                                </div>
                            </div>
                        `;
            }).join('')}
                    
                    <div class="pt-4 space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Subtotal:</span>
                            <span class="font-semibold">${subtotal.toFixed(2)} MXN</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Envío:</span>
                            <span class="font-semibold">${shipping.toFixed(2)} MXN</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Descuento:</span>
                            <span class="font-semibold text-green-600">-${discountAmount.toFixed(2)} MXN</span>
                        </div>
                        <hr class="border-gray-200">
                        <div class="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span class="text-dark-green">${total.toFixed(2)} MXN</span>
                        </div>
                        <div class="text-sm text-gray-500 mt-2">
                            <p>${cart.length} productos • ${totalUnits} unidades</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    function generatePDF() {
        console.log('📄 Iniciando generación de PDF...');
        
        try {
            // Verificar que el generador esté disponible
            if (!window.quotePDFGenerator) {
                console.error('❌ quotePDFGenerator no está disponible');
                alert('Error: El generador de PDF no está disponible. Recarga la página e inténtalo de nuevo.');
                return;
            }

            const cart = loadCart();
            console.log('🛒 Carrito cargado:', cart.length, 'productos');
            
            if (cart.length === 0) {
                alert('Tu carrito está vacío. Agrega algunos productos antes de generar la cotización.');
                return;
            }

            const subtotal = cart.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
            const shipping = cart.length > 0 ? currentShippingCost : 0;
            const discountAmount = discountApplied ? (subtotal * discountPercentage / 100) : 0;

            console.log('💰 Totales calculados:', { subtotal, shipping, discountAmount });

            // Preparar datos del carrito
            const cartItems = cart.map(item => {
                let typeDisplay = item.type || 'Soya';
                let sizeDisplay = item.size;
                
                // Manejar el tamaño correctamente
                if (typeof item.size === 'object' && item.size.label) {
                    sizeDisplay = item.size.label;
                } else if (typeof item.size === 'string') {
                    sizeDisplay = item.size;
                } else {
                    sizeDisplay = '45 gr';
                }

                return {
                    ...item,
                    type: typeDisplay,
                    size: sizeDisplay,
                    price: item.price || item.unitPrice || 60,
                    quantity: item.quantity || 1
                };
            });

            const cartData = {
                items: cartItems,
                subtotal: subtotal,
                shipping: shipping,
                discount: discountAmount
            };

            console.log('📦 Datos del carrito preparados:', cartData);

            // Obtener datos del formulario
            let shippingData = {};
            try {
                if (window.quotePDFGenerator.getShippingData) {
                    shippingData = window.quotePDFGenerator.getShippingData();
                } else {
                    // Datos por defecto si no hay formulario
                    shippingData = {
                        fullName: 'Cliente',
                        email: 'cliente@email.com',
                        phone: 'No especificado',
                        address: 'Dirección por confirmar',
                        city: 'Ciudad',
                        state: 'Estado',
                        postalCode: '00000'
                    };
                }
            } catch (error) {
                console.warn('⚠️ Error obteniendo datos de envío, usando datos por defecto:', error);
                shippingData = {
                    fullName: 'Cliente',
                    email: 'cliente@email.com',
                    phone: 'No especificado',
                    address: 'Dirección por confirmar',
                    city: 'Ciudad',
                    state: 'Estado',
                    postalCode: '00000'
                };
            }

            console.log('📋 Datos de envío:', shippingData);

            // Generar PDF
            console.log('🚀 Generando PDF...');
            window.quotePDFGenerator.generateQuotePDF(cartData, shippingData);

            console.log('✅ PDF generado exitosamente');
            showNotification('Cotización PDF descargada correctamente', 'success');

        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            alert(`Error al generar el PDF: ${error.message || error}. Por favor, inténtalo de nuevo.`);
        }
    }
    
    function init() {
        console.log('🚀 Inicializando checkout...');
        
        // Apply discount
        const applyDiscountBtn = document.getElementById('apply-discount');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', function () {
                const code = document.getElementById('discount-code').value.trim().toUpperCase();

                // Usar el sistema de promociones dinámico
                const promotions = new PromotionsManager();
                const validPromo = promotions.validatePromoCode(code);

                if (validPromo && !discountApplied) {
                    discountApplied = true;
                    discountPercentage = validPromo.discount;
                    window.discountApplied = true;
                    window.discountPercentage = 15;

                    // Actualizar totales usando la función del carrito
                    if (window.displayCartItems) {
                        window.displayCartItems();
                    }

                    this.textContent = '✅ Aplicado';
                    this.classList.add('bg-green-500');
                    this.classList.remove('bg-dark-green');
                    document.getElementById('discount-code').disabled = true;

                    showNotification('¡Descuento del 15% aplicado correctamente!', 'success');
                } else if (discountApplied) {
                    showNotification('El código de descuento ya ha sido aplicado', 'warning');
                } else {
                    showNotification('Código de descuento inválido', 'warning');
                }
            });
        }

        // Shipping options
        document.querySelectorAll('input[name="shipping-method"]').forEach(option => {
            option.addEventListener('change', function () {
                currentShippingCost = this.value === 'express' ? 120 : 50;
                window.currentShippingCost = currentShippingCost;
                
                // Actualizar totales usando la función del carrito
                if (window.displayCartItems) {
                    window.displayCartItems();
                }
            });
        });

        // Clear cart
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function () {
                if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                    localStorage.removeItem('cart');
                    discountApplied = false;
                    discountPercentage = 0;
                    window.discountApplied = false;
                    window.discountPercentage = 0;
                    
                    if (window.displayCartItems) {
                        window.displayCartItems();
                    }
                    if (window.updateCartCount) {
                        window.updateCartCount();
                    }
                    
                    showNotification('Carrito vaciado correctamente', 'info');
                }
            });
        }

        // Navigation
        const continueToShippingBtn = document.getElementById('continue-to-shipping');
        if (continueToShippingBtn) {
            continueToShippingBtn.addEventListener('click', function () {
                const cart = loadCart();
                if (cart.length === 0) {
                    showNotification('Tu carrito está vacío. Agrega algunos productos primero.', 'warning');
                    return;
                }

                document.getElementById('cart-step').classList.add('hidden');
                document.getElementById('shipping-step').classList.remove('hidden');
                document.getElementById('step-1').classList.remove('active');
                document.getElementById('step-2').classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        const continueToPaymentBtn = document.getElementById('continue-to-payment');
        if (continueToPaymentBtn) {
            continueToPaymentBtn.addEventListener('click', function () {
                // Validar formulario
                const form = document.getElementById('shipping-form');
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                document.getElementById('shipping-step').classList.add('hidden');
                document.getElementById('payment-step').classList.remove('hidden');
                document.getElementById('step-2').classList.remove('active');
                document.getElementById('step-3').classList.add('active');

                // Actualizar resumen final
                updateFinalOrderSummary();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        const backToCartBtn = document.getElementById('back-to-cart');
        if (backToCartBtn) {
            backToCartBtn.addEventListener('click', function () {
                document.getElementById('shipping-step').classList.add('hidden');
                document.getElementById('cart-step').classList.remove('hidden');
                document.getElementById('step-2').classList.remove('active');
                document.getElementById('step-1').classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        const backToShippingBtn = document.getElementById('back-to-shipping');
        if (backToShippingBtn) {
            backToShippingBtn.addEventListener('click', function () {
                document.getElementById('payment-step').classList.add('hidden');
                document.getElementById('shipping-step').classList.remove('hidden');
                document.getElementById('step-3').classList.remove('active');
                document.getElementById('step-2').classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // PDF Generation
        const downloadQuoteBtn = document.getElementById('download-quote');
        if (downloadQuoteBtn) {
            downloadQuoteBtn.addEventListener('click', function () {
                generatePDF();
            });
        }
        
        console.log('✅ Checkout inicializado correctamente');
    }
    
    // Exportar variables globales para compatibilidad
    window.discountApplied = discountApplied;
    window.discountPercentage = discountPercentage;
    window.currentShippingCost = currentShippingCost;
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();