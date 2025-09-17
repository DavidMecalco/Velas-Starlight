/**
 * ========================================
 * CARRITO DE COMPRAS MEJORADO
 * Velas Starlight - Enhanced Shopping Cart
 * ========================================
 */

class EnhancedShoppingCart {
    constructor() {
        this.cart = [];
        this.currentStep = 1;
        this.discountApplied = false;
        this.discountPercentage = 0;
        this.currentShippingCost = 50;
        this.isLoading = false;
        
        // Configuración de animaciones
        this.animationConfig = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
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
        
        // Mostrar items del carrito
        this.displayCartItems();
        
        // Actualizar contador
        this.updateCartCount();
        
        // Inicializar animaciones
        this.initializeAnimations();
        
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

        // Formulario de envío
        this.setupShippingForm();
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
                this.currentShippingCost = e.target.value === 'express' ? 120 : 50;
                this.updateTotals();
                this.animateShippingOption(e.target.closest('.shipping-option'));
            });
        });
    }

    /**
     * Configurar formulario de envío
     */
    setupShippingForm() {
        const form = document.getElementById('shipping-form');
        if (form) {
            // Validación en tiempo real
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
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
            <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
                <!-- Imagen del producto -->
                <div class="flex-shrink-0">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                </div>
                
                <!-- Detalles del producto -->
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <div class="cart-item-specs">
                        <div class="cart-item-spec">
                            <i class="fas fa-tag"></i>
                            <span>Categoría: ${item.category}</span>
                        </div>
                        <div class="cart-item-spec">
                            <i class="fas fa-leaf"></i>
                            <span>Tipo: ${typeDisplay}</span>
                        </div>
                        <div class="cart-item-spec">
                            <i class="fas fa-weight"></i>
                            <span>Tamaño: ${item.size.label}</span>
                        </div>
                        <div class="cart-item-spec">
                            <i class="fas fa-palette"></i>
                            <span>Fragancia: ${item.fragrance}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Controles de cantidad -->
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="enhancedCart.changeQuantity(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="enhancedCart.changeQuantity(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <!-- Precio -->
                <div class="price-display">
                    <div class="price-main">$${itemTotal.toFixed(2)} MXN</div>
                    <div class="price-unit">$${unitPrice.toFixed(2)} c/u</div>
                </div>
                
                <!-- Botón eliminar -->
                <button class="remove-btn" onclick="enhancedCart.removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                    <span class="sr-only">Eliminar producto</span>
                </button>
            </div>
        `;

        return itemElement;
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
                
                console.log('🛒 Cantidad actualizada:', {
                    producto: this.cart[index].title,
                    cantidad: newQuantity,
                    precioUnitario: unitPrice,
                    total: this.cart[index].total
                });
            }
        }
    }

    /**
     * Eliminar producto del carrito
     */
    removeFromCart(index) {
        if (this.cart[index]) {
            const productName = this.cart[index].title;
            
            // Animar salida
            const itemElement = document.querySelectorAll('.cart-item')[index];
            if (itemElement) {
                itemElement.style.transform = 'translateX(-100%)';
                itemElement.style.opacity = '0';
                
                setTimeout(() => {
                    this.cart.splice(index, 1);
                    this.saveCart();
                    this.displayCartItems();
                    this.updateCartCount();
                    this.showNotification(`${productName} eliminado del carrito`, 'info');
                }, 300);
            } else {
                this.cart.splice(index, 1);
                this.saveCart();
                this.displayCartItems();
                this.updateCartCount();
                this.showNotification(`${productName} eliminado del carrito`, 'info');
            }
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
            // Animar salida de todos los items
            const items = document.querySelectorAll('.cart-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(-100%)';
                    item.style.opacity = '0';
                }, index * 100);
            });

            setTimeout(() => {
                this.cart = [];
                this.discountApplied = false;
                this.discountPercentage = 0;
                this.saveCart();
                this.displayCartItems();
                this.updateCartCount();
                this.resetDiscountButton();
                this.showNotification('Carrito vaciado correctamente', 'success');
            }, items.length * 100 + 300);
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
            
            // Animar el descuento
            const discountElement = document.getElementById('discount');
            if (discountElement) {
                discountElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    discountElement.style.transform = 'scale(1)';
                }, 200);
            }
        } else if (this.discountApplied) {
            this.showNotification('El código de descuento ya ha sido aplicado', 'warning');
        } else {
            this.showNotification('Código de descuento inválido', 'warning');
            
            // Animar error en el input
            codeInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                codeInput.style.borderColor = '';
            }, 2000);
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
        const subtotal = this.cart.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
        const shipping = this.cart.length > 0 ? this.currentShippingCost : 0;
        const discountAmount = this.discountApplied ? (subtotal * this.discountPercentage / 100) : 0;
        const total = subtotal + shipping - discountAmount;

        // Actualizar elementos del DOM
        this.updateElement('subtotal', `$${subtotal.toFixed(2)} MXN`);
        this.updateElement('shipping', `$${shipping.toFixed(2)} MXN`);
        this.updateElement('discount', `-$${discountAmount.toFixed(2)} MXN`);
        this.updateElement('total', `$${total.toFixed(2)} MXN`);

        // Actualizar resumen del pedido
        this.updateOrderSummary(subtotal, shipping, discountAmount, total);
    }

    /**
     * Actualizar elemento del DOM con animación
     */
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.style.transform = 'scale(0.9)';
            element.style.opacity = '0.7';
            
            setTimeout(() => {
                element.textContent = value;
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                element.style.transition = 'all 0.2s ease';
            }, 100);
        }
    }

    /**
     * Actualizar resumen del pedido
     */
    updateOrderSummary(subtotal, shipping, discount, total) {
        const orderSummary = document.getElementById('order-summary');
        if (!orderSummary) return;

        const totalUnits = this.cart.reduce((sum, item) => sum + item.quantity, 0);

        orderSummary.innerHTML = `
            <div class="space-y-1 mb-6">
                <div class="summary-line">
                    <span class="summary-label">Subtotal:</span>
                    <span class="summary-value">$${subtotal.toFixed(2)} MXN</span>
                </div>
                <div class="summary-line">
                    <span class="summary-label">Envío:</span>
                    <span class="summary-value">$${shipping.toFixed(2)} MXN</span>
                </div>
                <div class="summary-line">
                    <span class="summary-label">Descuento:</span>
                    <span class="summary-value discount">-$${discount.toFixed(2)} MXN</span>
                </div>
                <div class="summary-line total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)} MXN</span>
                </div>
                <div class="text-sm text-gray-500 mt-4 text-center">
                    <p>${this.cart.length} productos • ${totalUnits} unidades</p>
                </div>
            </div>
        `;
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

        if (step === 3) {
            const form = document.getElementById('shipping-form');
            if (form && !form.checkValidity()) {
                form.reportValidity();
                return;
            }
        }

        // Ocultar paso actual
        const currentStepElement = document.getElementById(`${this.getStepName(this.currentStep)}-step`);
        if (currentStepElement) {
            currentStepElement.style.opacity = '0';
            currentStepElement.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                currentStepElement.classList.add('hidden');
            }, 300);
        }

        // Actualizar indicadores de paso
        this.updateStepIndicators(step);

        // Mostrar nuevo paso
        setTimeout(() => {
            const newStepElement = document.getElementById(`${this.getStepName(step)}-step`);
            if (newStepElement) {
                newStepElement.classList.remove('hidden');
                newStepElement.style.opacity = '0';
                newStepElement.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    newStepElement.style.opacity = '1';
                    newStepElement.style.transform = 'translateX(0)';
                    newStepElement.style.transition = 'all 0.3s ease';
                }, 50);
            }

            // Actualizar resumen si es necesario
            if (step === 3) {
                this.updateFinalOrderSummary();
            }

            this.currentStep = step;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
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
            
            // Animación del contador
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.transition = 'transform 0.2s ease';
            }, 200);
        });
    }

    /**
     * Validar campo del formulario
     */
    validateField(field) {
        const isValid = field.checkValidity();
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
        }
        
        return isValid;
    }

    /**
     * Limpiar error de campo
     */
    clearFieldError(field) {
        field.classList.remove('error');
    }

    /**
     * Animar opción de envío seleccionada
     */
    animateShippingOption(optionElement) {
        // Remover selección anterior
        document.querySelectorAll('.shipping-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Agregar selección actual
        optionElement.classList.add('selected');
        
        // Animación
        optionElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            optionElement.style.transform = 'scale(1)';
        }, 200);
    }

    /**
     * Actualizar resumen final del pedido
     */
    updateFinalOrderSummary() {
        const finalSummary = document.getElementById('final-order-summary');
        if (!finalSummary) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
        const shipping = this.cart.length > 0 ? this.currentShippingCost : 0;
        const discountAmount = this.discountApplied ? (subtotal * this.discountPercentage / 100) : 0;
        const total = subtotal + shipping - discountAmount;
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
                
                <div class="pt-4 space-y-2">
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
                        <span class="font-semibold text-green-600">-$${discountAmount.toFixed(2)} MXN</span>
                    </div>
                    <hr class="border-gray-200">
                    <div class="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span class="text-dark-green">$${total.toFixed(2)} MXN</span>
                    </div>
                    <div class="text-sm text-gray-500 mt-2">
                        <p>${this.cart.length} productos • ${totalUnits} unidades</p>
                    </div>
                </div>
            </div>
        `;
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
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type]} notification-icon"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Ocultar automáticamente
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    /**
     * Inicializar animaciones
     */
    initializeAnimations() {
        // Animar elementos con stagger
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 100);
        });
    }

    /**
     * Generar PDF de cotización
     */
    generatePDF() {
        console.log('📄 Iniciando generación de PDF...');

        try {
            // Verificar que el generador esté disponible
            if (!window.quotePDFGenerator) {
                console.error('❌ quotePDFGenerator no está disponible');
                this.showNotification('Error: El generador de PDF no está disponible. Recarga la página e inténtalo de nuevo.', 'error');
                return;
            }

            if (this.cart.length === 0) {
                this.showNotification('Tu carrito está vacío. Agrega algunos productos antes de generar la cotización.', 'warning');
                return;
            }

            const subtotal = this.cart.reduce((sum, item) => sum + (item.total || item.price * item.quantity), 0);
            const shipping = this.cart.length > 0 ? this.currentShippingCost : 0;
            const discountAmount = this.discountApplied ? (subtotal * this.discountPercentage / 100) : 0;

            // Preparar datos del carrito
            const cartItems = this.cart.map(item => {
                let typeDisplay = item.type || 'Soya';
                let sizeDisplay = item.size;

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

            // Obtener datos del formulario
            let shippingData = {};
            try {
                if (window.quotePDFGenerator.getShippingData) {
                    shippingData = window.quotePDFGenerator.getShippingData();
                } else {
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

            // Generar PDF
            window.quotePDFGenerator.generateQuotePDF(cartData, shippingData);
            this.showNotification('Cotización PDF descargada correctamente', 'success');

        } catch (error) {
            console.error('❌ Error generando PDF:', error);
            this.showNotification(`Error al generar el PDF: ${error.message || error}. Por favor, inténtalo de nuevo.`, 'error');
        }
    }
}

// Crear instancia global
let enhancedCart;

// Inicialización automática cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    enhancedCart = new EnhancedShoppingCart();
    enhancedCart.init();
    
    // Configurar botón de descarga de PDF si existe
    const downloadBtn = document.getElementById('download-quote');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => enhancedCart.generatePDF());
    }
    
    console.log('✅ Carrito mejorado completamente inicializado');
});