/**
 * ========================================
 * CARRITO DE COMPRAS MEJORADO - VERSIÓN CORREGIDA
 * Velas Starlight - Enhanced Shopping Cart
 * ========================================
 */

class EnhancedShoppingCart {
    constructor() {
        this.cart = [];
        this.currentStep = 1;
        this.discountApplied = false;
        this.discountPercentage = 0;
        this.currentShippingCost = this.loadShippingCost();
        this.isLoading = false;
        
        // Configuración de animaciones
        this.animationConfig = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        };
    }

    /**
     * Cargar costo de envío desde configuración
     */
    loadShippingCost() {
        try {
            const shippingConfig = localStorage.getItem('starlightShippingConfig');
            if (shippingConfig) {
                const config = JSON.parse(shippingConfig);
                return config.standard.cost || 50;
            }
        } catch (error) {
            console.error('❌ Error cargando configuración de envío:', error);
        }
        return 50; // Valor por defecto
    }

    /**
     * Cargar configuración completa de envíos
     */
    loadShippingConfig() {
        try {
            const shippingConfig = localStorage.getItem('starlightShippingConfig');
            if (shippingConfig) {
                return JSON.parse(shippingConfig);
            }
        } catch (error) {
            console.error('❌ Error cargando configuración de envío:', error);
        }
        
        // Configuración por defecto
        return {
            standard: { cost: 50, name: 'Envío Estándar', description: 'Entrega en 3-5 días hábiles' },
            express: { cost: 120, name: 'Envío Express', description: 'Entrega en 1-2 días hábiles' },
            freeShippingThreshold: 500
        };
    }

    /**
     * Inicializar el carrito
     */
    init() {
        console.log('🛒 Inicializando carrito mejorado...');
        
        // Cargar carrito desde localStorage
        this.loadCart();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Cargar opciones de envío dinámicamente
        this.loadShippingOptions();
        
        // Mostrar items del carrito
        this.displayCartItems();
        
        // Actualizar contador
        this.updateCartCount();
        
        console.log('✅ Carrito mejorado inicializado');
    }

    /**
     * Cargar carrito desde localStorage
     */
    loadCart() {
        try {
            const cartData = localStorage.getItem('cart');
            this.cart = cartData ? JSON.parse(cartData) : [];
            console.log(`🛒 Carrito cargado: ${this.cart.length} productos`);
        } catch (error) {
            console.error('❌ Error cargando carrito:', error);
            this.cart = [];
        }
    }

    /**
     * Guardar carrito en localStorage
     */
    saveCart() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            console.log('💾 Carrito guardado');
        } catch (error) {
            console.error('❌ Error guardando carrito:', error);
        }
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Botón limpiar carrito
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }

        // Código de descuento
        const applyDiscountBtn = document.getElementById('apply-discount');
        if (applyDiscountBtn) {
            applyDiscountBtn.addEventListener('click', () => this.applyDiscount());
        }

        // Navegación entre pasos
        this.setupStepNavigation();

        // Opciones de envío
        this.setupShippingOptions();

        // Botón generar PDF
        const generatePdfBtn = document.getElementById('generate-pdf');
        if (generatePdfBtn) {
            generatePdfBtn.addEventListener('click', () => this.generatePDF());
        }

        // Botón de diagnóstico PDF (solo en desarrollo)
        const diagnosePdfBtn = document.getElementById('diagnose-pdf');
        if (diagnosePdfBtn) {
            diagnosePdfBtn.addEventListener('click', () => this.diagnosePDFIssues());
            // Mostrar solo si estamos en localhost o con parámetro de debug
            if (window.location.hostname === 'localhost' || window.location.search.includes('debug=pdf')) {
                diagnosePdfBtn.style.display = 'inline-block';
            }
        }
    }

    /**
     * Configurar navegación entre pasos
     */
    setupStepNavigation() {
        // Continuar al envío
        const continueToShippingBtn = document.getElementById('continue-to-shipping');
        if (continueToShippingBtn) {
            continueToShippingBtn.addEventListener('click', () => this.goToStep(2));
        }

        // Continuar al pago
        const continueToPaymentBtn = document.getElementById('continue-to-payment');
        if (continueToPaymentBtn) {
            continueToPaymentBtn.addEventListener('click', () => this.goToStep(3));
        }

        // Volver al carrito
        const backToCartBtn = document.getElementById('back-to-cart');
        if (backToCartBtn) {
            backToCartBtn.addEventListener('click', () => this.goToStep(1));
        }

        // Volver al envío
        const backToShippingBtn = document.getElementById('back-to-shipping');
        if (backToShippingBtn) {
            backToShippingBtn.addEventListener('click', () => this.goToStep(2));
        }
    }

    /**
     * Configurar opciones de envío
     */
    setupShippingOptions() {
        const shippingOptions = document.querySelectorAll('input[name="shipping-method"]');
        shippingOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                // Cargar costos desde configuración
                const shippingConfig = this.loadShippingConfig();
                this.currentShippingCost = e.target.value === 'express' ? 
                    shippingConfig.express.cost : shippingConfig.standard.cost;
                this.updateTotals();
                this.animateShippingOption(e.target.closest('.shipping-option'));
            });
        });
    }

    /**
     * Cargar opciones de envío dinámicamente
     */
    loadShippingOptions() {
        const container = document.getElementById('shipping-options-container');
        if (!container) return;

        const config = this.loadShippingConfig();
        container.innerHTML = '';

        // Crear opción estándar si está activa
        if (config.standard.active !== false) {
            const standardOption = this.createShippingOption(
                'standard',
                config.standard.name,
                config.standard.description,
                config.standard.cost,
                true // checked por defecto
            );
            container.appendChild(standardOption);
        }

        // Crear opción express si está activa
        if (config.express.active !== false) {
            const expressOption = this.createShippingOption(
                'express',
                config.express.name,
                config.express.description,
                config.express.cost,
                false
            );
            container.appendChild(expressOption);
        }

        // Configurar event listeners para las nuevas opciones
        this.setupShippingOptions();
    }

    /**
     * Crear elemento de opción de envío
     */
    createShippingOption(value, name, description, cost, checked = false) {
        const label = document.createElement('label');
        label.className = 'shipping-option';
        
        label.innerHTML = `
            <input type="radio" name="shipping-method" value="${value}" ${checked ? 'checked' : ''}>
            <div class="shipping-option-details">
                <div class="shipping-option-name">${name}</div>
                <div class="shipping-option-description">${description}</div>
            </div>
            <div class="shipping-option-price">$${cost.toFixed(2)}</div>
        `;

        return label;
    }

    /**
     * Mostrar items del carrito con animaciones
     */
    displayCartItems() {
        const container = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');
        const itemsCount = document.getElementById('cart-items-count');
        const unitsCount = document.getElementById('cart-units-count');

        if (!container) return;

        if (this.cart.length === 0) {
            container.style.display = 'none';
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (itemsCount) itemsCount.textContent = '0';
            if (unitsCount) unitsCount.textContent = '0';
            this.updateTotals();
            return;
        }

        container.style.display = 'block';
        if (emptyMessage) emptyMessage.style.display = 'none';
        if (itemsCount) itemsCount.textContent = this.cart.length;
        
        const totalUnits = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (unitsCount) unitsCount.textContent = totalUnits;

        // Limpiar contenedor
        container.innerHTML = '';

        // Crear items con animación
        this.cart.forEach((item, index) => {
            const itemElement = this.createCartItemElement(item, index);
            container.appendChild(itemElement);
            
            // Animar entrada
            setTimeout(() => {
                itemElement.style.opacity = '1';
                itemElement.style.transform = 'translateY(0)';
            }, index * 100);
        });

        this.updateTotals();
    }

    /**
     * Crear elemento de item del carrito
     */
    createCartItemElement(item, index) {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item animate-fade-in';
        itemElement.style.opacity = '0';
        itemElement.style.transform = 'translateY(20px)';
        itemElement.style.transition = 'all 0.3s ease';

        // Determinar tipo de display
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

        // Calcular precios
        const unitPrice = item.unitPrice || item.size.price || (item.price / (item.quantity || 1));
        const itemTotal = item.total || (unitPrice * item.quantity);

        itemElement.innerHTML = `
            <div class="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
                <div class="flex flex-col gap-4">
                    <!-- Imagen y título en móvil -->
                    <div class="flex items-center gap-3 md:hidden">
                        <img src="${item.image}" alt="${item.title}"
                              class="w-12 h-12 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                              onerror="this.src='../images/placeholder.jpg'">
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-dark-green text-base leading-tight">${item.title}</h3>
                            <div class="text-sm text-gray-600 mt-1">${item.category} • ${item.size.label}</div>
                        </div>
                    </div>

                    <!-- Layout desktop -->
                    <div class="hidden md:flex md:flex-row gap-4">
                        <!-- Imagen del producto -->
                        <div class="flex-shrink-0">
                            <img src="${item.image}" alt="${item.title}"
                                  class="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                  onerror="this.src='../images/placeholder.jpg'">
                        </div>

                        <!-- Información del producto -->
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-dark-green text-lg mb-2">${item.title}</h3>
                            <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                <div class="flex items-center">
                                    <i class="fas fa-tag text-sage-green mr-2"></i>
                                    <span>${item.category}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-leaf text-sage-green mr-2"></i>
                                    <span>${typeDisplay}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-weight text-sage-green mr-2"></i>
                                    <span>${item.size.label}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-palette text-sage-green mr-2"></i>
                                    <span>${item.fragrance}</span>
                                </div>
                            </div>

                            <!-- Promociones -->
                            ${this.generatePromotionBadges(item)}
                        </div>
                    </div>

                    <!-- Controles y precio - Mobile first -->
                    <div class="flex items-center justify-between gap-3">
                        <!-- Controles de cantidad -->
                        <div class="flex items-center bg-gray-50 rounded-lg p-1 flex-shrink-0">
                            <button onclick="enhancedCart.changeQuantity(${index}, -1)"
                                    class="w-7 h-7 md:w-8 md:h-8 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
                                <i class="fas fa-minus text-xs md:text-sm text-gray-600"></i>
                            </button>
                            <span class="w-8 md:w-12 text-center font-semibold text-dark-green text-sm md:text-base">${item.quantity}</span>
                            <button onclick="enhancedCart.changeQuantity(${index}, 1)"
                                    class="w-7 h-7 md:w-8 md:h-8 bg-white rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200">
                                <i class="fas fa-plus text-xs md:text-sm text-gray-600"></i>
                            </button>
                        </div>

                        <!-- Precio -->
                        <div class="text-right flex-shrink-0">
                            <div class="text-lg md:text-xl font-bold text-dark-green">$${itemTotal.toFixed(2)}</div>
                            <div class="text-xs md:text-sm text-gray-500">$${unitPrice.toFixed(2)} c/u</div>
                        </div>

                        <!-- Botón eliminar -->
                        <button onclick="enhancedCart.removeFromCart(${index})"
                                class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0">
                            <i class="fas fa-trash text-sm md:text-base"></i>
                        </button>
                    </div>

                    <!-- Información detallada en móvil -->
                    <div class="md:hidden">
                        <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                            <div class="flex items-center">
                                <i class="fas fa-leaf text-sage-green mr-1"></i>
                                <span>${typeDisplay}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-palette text-sage-green mr-1"></i>
                                <span>${item.fragrance}</span>
                            </div>
                        </div>
                        ${this.generatePromotionBadges(item)}
                    </div>
                </div>
            </div>
        `;

        return itemElement;
    }

    /**
     * Generar badges de promociones para un producto
     */
    generatePromotionBadges(item) {
        let badges = '';

        // Badge para promoción 2x1
            const freeItems = Math.floor(item.quantity / 2);
            const savings = freeItems * (item.unitPrice || item.size.price || item.price);
            badges += `
                <div class="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-3 mt-3">
                    <div class="flex items-center space-x-2 mb-1">
                        <i class="fas fa-gift text-green-600"></i>
                        <span class="text-green-700 font-semibold">¡Promoción 2x1 Activa!</span>
                    </div>
                    <div class="text-sm text-green-600">
                        ${freeItems > 0 ? `Ahorras $${savings.toFixed(2)} MXN (${freeItems} producto${freeItems > 1 ? 's' : ''} gratis)` : 'Agrega una unidad más para obtener 1 gratis'}
                    </div>
                </div>
            `;
        }

        // Badge para descuento especial
            const unitPrice = item.unitPrice || item.size.price || item.price;
            badges += `
                <div class="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3 mt-3">
                    <div class="flex items-center space-x-2 mb-1">
                        <i class="fas fa-percent text-orange-600"></i>
                    </div>
                    <div class="text-sm text-orange-600">
                        Ahorras $${savings.toFixed(2)} MXN en este producto
                    </div>
                </div>
            `;
        }

        return badges;
    }

    /**
     * Cambiar cantidad de un producto
     */
    changeQuantity(index, change) {
        if (this.cart[index]) {
            const newQuantity = this.cart[index].quantity + change;
            if (newQuantity > 0) {
                this.cart[index].quantity = newQuantity;
                
                // Recalcular total
                const unitPrice = this.cart[index].unitPrice || this.cart[index].size.price || this.cart[index].price;
                this.cart[index].total = unitPrice * newQuantity;
                this.cart[index].price = unitPrice;
                
                this.saveCart();
                this.displayCartItems();
                this.updateCartCount();
                
                this.showNotification(`Cantidad actualizada`, 'success', 2000);
            }
        }
    }

    /**
     * Eliminar producto del carrito
     */
    removeFromCart(index) {
        if (this.cart[index]) {
            const productName = this.cart[index].title;
            this.cart.splice(index, 1);
            this.saveCart();
            this.displayCartItems();
            this.updateCartCount();
            this.showNotification(`${productName} eliminado del carrito`, 'info');
        }
    }

    /**
     * Limpiar carrito completo
     */
    clearCart() {
        if (this.cart.length === 0) {
            this.showNotification('El carrito ya está vacío', 'info');
            return;
        }

        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            this.cart = [];
            this.discountApplied = false;
            this.discountPercentage = 0;
            this.saveCart();
            this.displayCartItems();
            this.updateCartCount();
            this.resetDiscountButton();
            this.showNotification('Carrito vaciado correctamente', 'success');
        }
    }

    /**
     * Aplicar código de descuento
     */
    applyDiscount() {
        const codeInput = document.getElementById('discount-code');
        const applyBtn = document.getElementById('apply-discount');
        
        if (!codeInput || !applyBtn) return;

        const code = codeInput.value.trim().toUpperCase();

        // Usar el sistema de promociones dinámico
        const promotions = new PromotionsManager();
        const validPromo = promotions.validatePromoCode(code);

        if (validPromo && !this.discountApplied) {
            this.discountApplied = true;
            this.discountPercentage = validPromo.discount;

            // Actualizar UI del botón
            applyBtn.textContent = '✅ Aplicado';
            applyBtn.classList.add('applied');
            applyBtn.disabled = true;
            codeInput.disabled = true;

            this.updateTotals();
            this.showNotification('¡Descuento del 15% aplicado correctamente!', 'success');
        } else if (this.discountApplied) {
            this.showNotification('El código de descuento ya ha sido aplicado', 'warning');
        } else {
            this.showNotification('Código de descuento inválido', 'warning');
        }
    }

    /**
     * Resetear botón de descuento
     */
    resetDiscountButton() {
        const codeInput = document.getElementById('discount-code');
        const applyBtn = document.getElementById('apply-discount');
        
        if (codeInput) {
            codeInput.disabled = false;
            codeInput.value = '';
        }
        
        if (applyBtn) {
            applyBtn.textContent = 'Aplicar';
            applyBtn.classList.remove('applied');
            applyBtn.disabled = false;
        }
    }

    /**
     * Actualizar totales
     */
    updateTotals() {
        let subtotal = 0;
        let totalDiscountAmount = 0;

        // Calcular subtotal aplicando descuentos 2x1 y especiales por producto
        this.cart.forEach(item => {
            const unitPrice = item.unitPrice || item.size.price || item.price;
            let itemSubtotal = unitPrice * item.quantity;
            let itemDiscount = 0;

            // Aplicar descuento 2x1
                const freeItems = Math.floor(item.quantity / 2);
                itemDiscount += freeItems * unitPrice;
            }

            // Aplicar descuento especial del producto
            }

            subtotal += itemSubtotal;
            totalDiscountAmount += itemDiscount;
        });

        const shipping = this.cart.length > 0 ? this.currentShippingCost : 0;
        const promoDiscountAmount = this.discountApplied ? (subtotal * this.discountPercentage / 100) : 0;
        const totalFinalDiscount = totalDiscountAmount + promoDiscountAmount;
        const total = subtotal + shipping - totalFinalDiscount;

        // Actualizar todos los elementos del DOM en todos los pasos
        this.updateAllTotalElements(subtotal, shipping, totalFinalDiscount, total);
    }

    /**
     * Actualizar todos los elementos de totales en todos los pasos
     */
    updateAllTotalElements(subtotal, shipping, discount, total) {
        // Paso 1 - Carrito
        this.updateElement('subtotal', `$${subtotal.toFixed(2)} MXN`);
        this.updateElement('shipping', `$${shipping.toFixed(2)} MXN`);
        this.updateElement('discount', `-$${discount.toFixed(2)} MXN`);
        this.updateElement('total', `$${total.toFixed(2)} MXN`);

        // Paso 2 - Envío
        this.updateElement('shipping-subtotal', `$${subtotal.toFixed(2)} MXN`);
        this.updateElement('shipping-cost', `$${shipping.toFixed(2)} MXN`);
        this.updateElement('shipping-discount', `-$${discount.toFixed(2)} MXN`);
        this.updateElement('shipping-total', `$${total.toFixed(2)} MXN`);

        // Paso 3 - Pago
        this.updateElement('final-subtotal', `$${subtotal.toFixed(2)} MXN`);
        this.updateElement('final-shipping', `$${shipping.toFixed(2)} MXN`);
        this.updateElement('final-discount', `-$${discount.toFixed(2)} MXN`);
        this.updateElement('final-total', `$${total.toFixed(2)} MXN`);

        // Actualizar resumen final del pedido
        this.updateFinalOrderSummary();
    }

    /**
     * Actualizar elemento del DOM con animación
     */
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    /**
     * Ir a un paso específico
     */
    goToStep(step) {
        // Validaciones específicas por paso
        if (step === 2 && this.cart.length === 0) {
            this.showNotification('Tu carrito está vacío. Agrega algunos productos primero.', 'warning');
            return;
        }

        // Ocultar paso actual
        const currentStepElement = document.getElementById(`${this.getStepName(this.currentStep)}-step`);
        if (currentStepElement) {
            currentStepElement.classList.add('hidden');
        }

        // Actualizar indicadores de paso
        this.updateStepIndicators(step);

        // Mostrar nuevo paso
        const newStepElement = document.getElementById(`${this.getStepName(step)}-step`);
        if (newStepElement) {
            newStepElement.classList.remove('hidden');
        }

        this.currentStep = step;
        this.updateTotals(); // Actualizar totales en el nuevo paso
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Obtener nombre del paso
     */
    getStepName(step) {
        const stepNames = {
            1: 'cart',
            2: 'shipping',
            3: 'payment'
        };
        return stepNames[step] || 'cart';
    }

    /**
     * Actualizar indicadores de paso
     */
    updateStepIndicators(activeStep) {
        for (let i = 1; i <= 3; i++) {
            const stepElement = document.getElementById(`step-${i}`);
            if (stepElement) {
                if (i === activeStep) {
                    stepElement.classList.add('active');
                    stepElement.classList.remove('completed');
                } else if (i < activeStep) {
                    stepElement.classList.remove('active');
                    stepElement.classList.add('completed');
                } else {
                    stepElement.classList.remove('active', 'completed');
                }
            }
        }
    }

    /**
     * Actualizar contador del carrito
     */
    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElements = document.querySelectorAll('#cart-count, #cart-count-mobile');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    /**
     * Animar opción de envío seleccionada
     */
    animateShippingOption(optionElement) {
        if (!optionElement) return;
        
        // Remover selección anterior
        document.querySelectorAll('.shipping-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Agregar selección actual
        optionElement.classList.add('selected');
    }

    /**
     * Actualizar resumen final del pedido
     */
    updateFinalOrderSummary() {
        const finalSummary = document.getElementById('final-order-summary');
        if (!finalSummary) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
        const totalUnits = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        finalSummary.innerHTML = `
            <div class="space-y-4 mb-6">
                <h4 class="font-semibold text-dark-green mb-4">Productos:</h4>
                ${this.cart.map(item => {
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
                                <p class="font-semibold">$${(item.total || (item.unitPrice || item.size.price) * item.quantity).toFixed(2)} MXN</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    /**
     * Generar PDF de cotización
     */
    generatePDF() {
        console.log('📄 Iniciando generación de PDF...');

        try {
            // Verificar que el generador esté disponible
            if (!window.quotePDFGenerator) {
                console.error('❌ Generador de PDF no disponible');
                this.showNotification('Error: Generador de PDF no disponible. Recargando página...', 'error');

                // Intentar recargar el generador
                setTimeout(() => {
                    if (!window.quotePDFGenerator) {
                        location.reload();
                    }
                }, 2000);
                return;
            }

            // Verificar que jsPDF esté disponible
            if (!window.quotePDFGenerator.jsPDF && typeof window.jsPDF === 'undefined') {
                console.error('❌ jsPDF no está disponible');
                this.showNotification('Error: Librería PDF no cargada. Inténtalo de nuevo.', 'error');
                return;
            }

            // Verificar que haya productos en el carrito
            if (!this.cart || this.cart.length === 0) {
                console.error('❌ Carrito vacío');
                this.showNotification('Error: El carrito está vacío', 'warning');
                return;
            }

            // Preparar datos del carrito con validaciones
            const cartData = {
                items: this.cart.map(item => ({
                    ...item,
                    unitPrice: item.unitPrice || item.size?.price || item.price || 0,
                    quantity: parseInt(item.quantity) || 1,
                    total: item.total || ((item.unitPrice || item.size?.price || item.price || 0) * (parseInt(item.quantity) || 1))
                })),
                subtotal: this.cart.reduce((sum, item) => sum + (item.total || (item.unitPrice || item.size?.price || item.price || 0) * (parseInt(item.quantity) || 1)), 0),
                shipping: this.currentShippingCost || 50,
                discount: this.discountApplied ? (this.cart.reduce((sum, item) => sum + (item.total || (item.unitPrice || item.size?.price || item.price || 0) * (parseInt(item.quantity) || 1)), 0) * this.discountPercentage / 100) : 0,
                total: 0 // Se calculará en el generador
            };

            // Obtener datos de envío con validaciones mejoradas
            let shippingData = {};
            try {
                const form = document.getElementById('shipping-form');
                if (form) {
                    // Verificar que el formulario esté completo
                    const requiredFields = ['full-name', 'email', 'phone', 'address', 'city', 'state', 'postal-code'];
                    const missingFields = requiredFields.filter(fieldId => {
                        const element = document.getElementById(fieldId);
                        return !element || !element.value || element.value.trim() === '';
                    });

                    if (missingFields.length > 0) {
                        console.warn('⚠️ Campos requeridos faltantes:', missingFields);
                        this.showNotification('Por favor completa todos los campos requeridos antes de generar el PDF', 'warning');
                        return;
                    }

                    shippingData = {
                        fullName: document.getElementById('full-name')?.value?.trim() || 'Cliente',
                        phone: document.getElementById('phone')?.value?.trim() || '',
                        email: document.getElementById('email')?.value?.trim() || '',
                        address: document.getElementById('address')?.value?.trim() || '',
                        city: document.getElementById('city')?.value?.trim() || '',
                        state: document.getElementById('state')?.value?.trim() || '',
                        postalCode: document.getElementById('postal-code')?.value?.trim() || '',
                        references: document.getElementById('references')?.value?.trim() || ''
                    };
                } else {
                    console.warn('⚠️ Formulario de envío no encontrado');
                    this.showNotification('Error: Formulario de envío no encontrado', 'error');
                    return;
                }
            } catch (error) {
                console.warn('⚠️ Error obteniendo datos de envío:', error);
                shippingData = {
                    fullName: 'Cliente',
                    phone: '',
                    email: '',
                    address: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    references: ''
                };
            }

            console.log('📋 Datos del carrito:', cartData);
            console.log('📋 Datos de envío:', shippingData);

            // Mostrar indicador de carga
            const generateBtn = document.getElementById('generate-pdf');
            if (generateBtn) {
                generateBtn.disabled = true;
                generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i><span>Generando PDF...</span>';
            }

            // Generar PDF con timeout para evitar bloqueos
            const pdfPromise = new Promise((resolve, reject) => {
                try {
                    window.quotePDFGenerator.generateQuotePDF(cartData, shippingData);
                    // Dar tiempo para que se complete la generación
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                } catch (error) {
                    reject(error);
                }
            });

            pdfPromise.then(() => {
                console.log('✅ PDF generado exitosamente');
                this.showNotification('PDF generado correctamente. Revisa tus descargas.', 'success');

                // Restaurar botón
                if (generateBtn) {
                    generateBtn.disabled = false;
                    generateBtn.innerHTML = '<i class="fas fa-file-pdf mr-2"></i><span>Generar Cotización PDF</span>';
                }
            }).catch((error) => {
                console.error('❌ Error generando PDF:', error);
                this.showNotification('Error al generar el PDF. Verifica la consola para más detalles.', 'error');

                // Restaurar botón
                if (generateBtn) {
                    generateBtn.disabled = false;
                    generateBtn.innerHTML = '<i class="fas fa-file-pdf mr-2"></i><span>Generar Cotización PDF</span>';
                }
            });

        } catch (error) {
            console.error('❌ Error general generando PDF:', error);
            this.showNotification('Error inesperado al generar el PDF. Inténtalo de nuevo.', 'error');

            // Restaurar botón en caso de error
            const generateBtn = document.getElementById('generate-pdf');
            if (generateBtn) {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-file-pdf mr-2"></i><span>Generar Cotización PDF</span>';
            }
        }
    }

    /**
     * Diagnosticar problemas con el generador de PDF
     */
    diagnosePDFIssues() {
        console.log('🔍 Diagnóstico de problemas con PDF:');

        const issues = [];

        // Verificar jsPDF
        if (typeof window.jsPDF === 'undefined') {
            issues.push('jsPDF no está cargado');
        }

        // Verificar generador
        if (!window.quotePDFGenerator) {
            issues.push('Generador de PDF no disponible');
        }

        // Verificar carrito
        if (!this.cart || this.cart.length === 0) {
            issues.push('Carrito vacío');
        }

        // Verificar formulario de envío
        const shippingForm = document.getElementById('shipping-form');
        if (!shippingForm) {
            issues.push('Formulario de envío no encontrado');
        }

        // Verificar campos requeridos
        const requiredFields = ['full-name', 'email', 'phone', 'address', 'city', 'state', 'postal-code'];
        const missingFields = requiredFields.filter(fieldId => {
            const element = document.getElementById(fieldId);
            return !element || !element.value || element.value.trim() === '';
        });

        if (missingFields.length > 0) {
            issues.push(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
        }

        if (issues.length === 0) {
            console.log('✅ No se encontraron problemas con el PDF');
            this.showNotification('Todo está listo para generar el PDF', 'success');
        } else {
            console.warn('⚠️ Problemas encontrados:', issues);
            this.showNotification(`Problemas encontrados: ${issues.join('; ')}`, 'warning');
        }

        return issues;
    }

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Remover notificación existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm notification ${type}`;
        
        const colors = {
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.className += ` ${colors[type]}`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="${icons[type]} mr-3"></i>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Ocultar automáticamente
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    }
}

// Hacer disponible globalmente
window.EnhancedShoppingCart = EnhancedShoppingCart;
